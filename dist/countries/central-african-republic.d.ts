/**
 * ValiNum v2
 *
 * Central African Republic
 *
 * +236, 8-digit national number, no trunk prefix.
 * Mobile numbers start with 7.
 *
 * 75 12 34 56 / +236 75 12 34 56
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const CENTRAL_AFRICAN_REPUBLIC: CountryDefinition;
/**
 * Validate a Central African Republic phone number.
 */
export declare function validateCentralAfricanRepublic(input: string, options?: ValidationOptions): ValidationResult;
