import { ValidationResult, ValidationOptions } from './types';

const OPERATORS_RDC: { [key: string]: string } = {
  '81': 'Vodacom', '82': 'Vodacom', '83': 'Vodacom',
  '80': 'Orange', '84': 'Orange', '85': 'Orange', '89': 'Orange',
  '90': 'Africell', '91': 'Africell',
  '97': 'Airtel', '98': 'Airtel', '99': 'Airtel'
};

export const validateDRC = (phone: string, options: ValidationOptions = {}): ValidationResult => {
  // 1. Nettoyage : on enlève tout ce qui n'est pas un chiffre (sauf le + au début)
  let cleaned = phone.replace(/[^\d+]/g, '');

  // 2. Gestion du préfixe +243
  if (cleaned.startsWith('+243')) {
    cleaned = cleaned.substring(4);
  } else if (cleaned.startsWith('243')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('0')) {
    // Si l'utilisateur commence par 081..., on enlève le 0
    cleaned = cleaned.substring(1);
  }

  // 3. Identification de l'opérateur (2 premiers chiffres)
  const ndc = cleaned.substring(0, 2);
  const operator = OPERATORS_RDC[ndc] || null;

  // 4. Validation de la longueur (Standard RDC : 9 chiffres après indicatif)
  const isValid = operator !== null && cleaned.length === 9;

  // 5. Construction du message d'erreur pour le "temps réel"
  let error = null;
  if (!operator && cleaned.length >= 2) {
    error = "Opérateur inconnu en RDC";
  } else if (operator && cleaned.length > 0 && cleaned.length < 9) {
    error = `Numéro ${operator} incomplet...`;
  } else if (cleaned.length > 9) {
    error = "Numéro trop long";
  }

  return {
    isValid,
    operator,
    formatted: `+243${cleaned}`,
    error
  };
};