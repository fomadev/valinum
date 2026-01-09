export interface ValidationResult {
  isValid: boolean;     // True si 9 chiffres exacts ET opérateur connu
  operator: string | null; // Vodacom, Orange, Airtel, Africell
  formatted: string;    // Le numéro au format +243...
  error: string | null; // Message clair pour l'utilisateur
}

export interface ValidationOptions {
  forceCountry?: boolean; // Si true, on considère que c'est du +243 même sans le saisir
}