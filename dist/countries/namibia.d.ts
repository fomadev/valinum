/**
 * ValiNum v2
 *
 * Namibia
 *
 * +264, 9-digit mobile number, trunk prefix 0.
 * Fixed lines (variable length) are not supported yet.
 *
 * 081 123 4567 / +264 81 123 4567
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const NAMIBIA: CountryDefinition;
/**
 * Validate a Namibia phone number.
 */
export declare function validateNamibia(input: string, options?: ValidationOptions): ValidationResult;
