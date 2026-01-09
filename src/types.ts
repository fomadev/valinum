export interface ValidationResult {
  isValid: boolean;
  operator: string | null;
  formatted: string;
  error: string | null;
  prefix: string;
}