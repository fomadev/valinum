/**
 * ValiNum v2
 *
 * Cameroon
 *
 * +237, 9-digit national number, no trunk prefix.
 * Mobile numbers start with 6, fixed lines with 2.
 *
 * 6 71 23 45 67 / +237 6 71 23 45 67
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const CAMEROON: CountryDefinition;
/**
 * Validate a Cameroon phone number.
 */
export declare function validateCameroon(input: string, options?: ValidationOptions): ValidationResult;
