/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

import { ValidationResult, ValidationOptions } from './types';

const OPERATORS_RDC: { [key: string]: string } = {
  '81': 'Vodacom', '82': 'Vodacom', '83': 'Vodacom',
  '80': 'Orange', '84': 'Orange', '85': 'Orange', '89': 'Orange',
  '90': 'Africell', '91': 'Africell',
  '97': 'Airtel', '98': 'Airtel', '99': 'Airtel'
};

// Listes des numéros courts officiels selon l'ARPTC
const SHORT_CODES_RDC: { [key: string]: { operator: string, label: string } } = {
  '1111': { operator: 'Vodacom', label: 'Service Client' },
  '1115': { operator: 'Vodacom', label: 'Service Client Postpaid' },
  '1116': { operator: 'Vodacom', label: 'Service Client Distributeurs' },
  '1777': { operator: 'Orange', label: 'Service Client' },
  '4000': { operator: 'Orange', label: 'Service Client' },
  '4004': { operator: 'Orange', label: 'Messagerie Vocale' },
  '121':  { operator: 'Airtel', label: 'Service Client' },
  '1211': { operator: 'Airtel', label: 'Service Client' },
  '111':  { operator: 'Africell', label: 'Service Client' },
  '9111': { operator: 'Africell', label: 'Service Client' }
};

// Racines USSD pour identifier l'opérateur du service financier ou autre
const identifyUssdOperator = (ussd: string): string | null => {
  if (ussd.startsWith('*1122#') || ussd.startsWith('*100#') || ussd.startsWith('*1107#') || ussd.startsWith('*1141#') || ussd.startsWith('*1160#') || ussd.startsWith('*1489#')) return 'Vodacom';
  if (ussd.startsWith('*1234#') || ussd.startsWith('*1111#')) return 'Orange';
  if (ussd.startsWith('*501#') || ussd.startsWith('*502#') || ussd.startsWith('*171#') || ussd.startsWith('*131#')) return 'Airtel';
  if (ussd.startsWith('*1112#') || ussd.startsWith('*112#') || ussd.startsWith('*111#')) return 'Africell';
  return null;
};

export const validateDRC = (phone: string, options: ValidationOptions = {}): ValidationResult => {
  const trimInput = phone.trim();

  // 1. DÉTECTION DES CODES USSD (Avant tout nettoyage agressif)
  if (trimInput.startsWith('*') && trimInput.endsWith('#')) {
    const cleanUssd = trimInput.replace(/\s/g, ''); // Enlever uniquement les espaces
    const operator = identifyUssdOperator(cleanUssd);
    
    return {
      isValid: options.allowServices || false,
      operator,
      formatted: cleanUssd,
      error: options.allowServices ? null : "Les codes USSD ne sont pas autorisés comme numéros d'abonnés",
      isServiceNumber: true,
      serviceType: 'USSD'
    };
  }

  // 2. NETTOYAGE STANDARD POUR LES NUMÉROS EN SÉRIE (v1.0.1)
  let cleaned = trimInput.replace(/\D/g, '');

  // 3. DÉTECTION DES NUMÉROS COURTS (Short Codes)
  if (SHORT_CODES_RDC[cleaned]) {
    const service = SHORT_CODES_RDC[cleaned];
    return {
      isValid: options.allowServices || false,
      operator: service.operator,
      formatted: cleaned,
      error: options.allowServices ? null : `Numéro court de service réservé (${service.label} ${service.operator})`,
      isServiceNumber: true,
      serviceType: 'ShortCode'
    };
  }

  // 4. TRAITEMENT DU NUMÉRO STANDARD D'ABONNÉ
  if (cleaned.startsWith('243')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  const ndc = cleaned.substring(0, 2);
  const operator = OPERATORS_RDC[ndc] || null;

  // Un numéro standard est valide s'il a un opérateur connu, fait 9 chiffres et n'est pas un numéro de service
  const isValid = operator !== null && cleaned.length === 9;

  let error: string | null = null;
  if (cleaned.length === 0) {
    error = "Numéro requis";
  } else if (!operator && cleaned.length >= 2) {
    error = "Opérateur inconnu en RDC";
  } else if (operator && cleaned.length < 9) {
    error = `Numéro ${operator} incomplet...`;
  } else if (cleaned.length > 9) {
    error = "Numéro trop long";
  }

  return {
    isValid,
    operator,
    formatted: cleaned.length > 0 ? `+243${cleaned}` : '',
    error,
    isServiceNumber: false,
    serviceType: null
  };
};