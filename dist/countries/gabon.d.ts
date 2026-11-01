/**
 * ValiNum v2
 *
 * Gabon
 *
 * +241, 8-digit national number since November 2019,
 * dialled with a leading 0 inside the country.
 *
 * 077 12 34 56 / +241 77 12 34 56
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const GABON: CountryDefinition;
/**
 * Validate a Gabon phone number.
 */
export declare function validateGabon(input: string, options?: ValidationOptions): ValidationResult;
