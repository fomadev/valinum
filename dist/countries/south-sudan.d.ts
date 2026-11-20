/**
 * ValiNum v2
 *
 * South Sudan
 *
 * +211, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0921 234 567 / +211 921 234 567
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const SOUTH_SUDAN: CountryDefinition;
/**
 * Validate a South Sudan phone number.
 */
export declare function validateSouthSudan(input: string, options?: ValidationOptions): ValidationResult;
