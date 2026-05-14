/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

export interface ValidationResult {
  isValid: boolean;     // True si 9 chiffres exacts ET opérateur connu
  operator: string | null; // Vodacom, Orange, Airtel, Africell
  formatted: string;    // Le numéro au format +243...
  error: string | null; // Message clair pour l'utilisateur
}

export interface ValidationOptions {
  forceCountry?: boolean; // Si true, on considère que c'est du +243 même sans le saisir
}