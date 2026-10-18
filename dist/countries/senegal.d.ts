/**
 * ValiNum v2
 *
 * Senegal
 *
 * +221, 9-digit national number, no trunk prefix.
 * Mobile numbers start with 7, fixed lines with 3.
 *
 * 77 123 45 67 / +221 77 123 45 67
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const SENEGAL: CountryDefinition;
/**
 * Validate a Senegal phone number.
 */
export declare function validateSenegal(input: string, options?: ValidationOptions): ValidationResult;
