/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

export interface ValidationResult {
  isValid: boolean;          // True si 9 chiffres exacts, opérateur connu ET pas un numéro spécial
  operator: string | null;   // Vodacom, Orange, Airtel, Africell
  formatted: string;         // Le numéro au format +243... ou le code USSD brut nettoyé
  error: string | null;      // Message clair pour l'utilisateur
  isServiceNumber: boolean;  // True si c'est un numéro court ou un code USSD
  serviceType: 'USSD' | 'ShortCode' | null; // Type de numéro spécial détecté
}

export interface ValidationOptions {
  forceCountry?: boolean;    // Si true, on considère que c'est du +243 même sans le saisir
  allowServices?: boolean;   // Optionnel : si le développeur veut exceptionnellement autoriser les services
}