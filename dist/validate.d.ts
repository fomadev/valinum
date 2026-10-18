/**
 * Smart validation with automatic country detection.
 *
 * - +243..., 00242..., +237...: the country is read
 *   from the country code.
 * - 237677123456 (country code without +): detected
 *   when the length matches that country's plan.
 * - 0824708027, 771234567 (national numbers): the
 *   default country is tried first; if it rejects the
 *   number and exactly one other country accepts it,
 *   that country wins. Ambiguous numbers are never
 *   guessed.
 */
import { ValidationOptions, ValidationResult } from "./types";
/**
 * Validate a phone number from any supported country.
 */
export declare function validate(input: string, options?: ValidationOptions): ValidationResult;
