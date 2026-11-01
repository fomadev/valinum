/**
 * ValiNum v2
 *
 * Burkina Faso
 *
 * +226, 8-digit national number, no trunk prefix.
 *
 * 70 12 34 56 / +226 70 12 34 56
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const BURKINA_FASO: CountryDefinition;
/**
 * Validate a Burkina Faso phone number.
 */
export declare function validateBurkinaFaso(input: string, options?: ValidationOptions): ValidationResult;
