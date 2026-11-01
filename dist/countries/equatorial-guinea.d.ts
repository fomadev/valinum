/**
 * ValiNum v2
 *
 * Equatorial Guinea
 *
 * +240, 9-digit national number, no trunk prefix.
 *
 * 222 123 456 / +240 222 123 456
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const EQUATORIAL_GUINEA: CountryDefinition;
/**
 * Validate an Equatorial Guinea phone number.
 */
export declare function validateEquatorialGuinea(input: string, options?: ValidationOptions): ValidationResult;
