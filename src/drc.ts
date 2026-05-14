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

export const validateDRC = (phone: string, options: ValidationOptions = {}): ValidationResult => {
  // 1. Nettoyage v1.0.1 : On ne garde strictement que les chiffres.
  // Supprime les espaces, tirets, parenthèses, points et le signe "+".
  let cleaned = phone.replace(/\D/g, '');

  // 2. Gestion du préfixe 243 ou du 0 initial
  if (cleaned.startsWith('243')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('0')) {
    // Si l'utilisateur a saisi 081..., on retire le 0 pour obtenir le NDC (81)
    cleaned = cleaned.substring(1);
  }

  // 3. Identification de l'opérateur (les 2 premiers chiffres restants)
  const ndc = cleaned.substring(0, 2);
  const operator = OPERATORS_RDC[ndc] || null;

  // 4. Validation de la longueur (Standard RDC : 9 chiffres après l'indicatif)
  const isValid = operator !== null && cleaned.length === 9;

  // 5. Construction du message d'erreur pour le "temps réel"
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
    error
  };
};