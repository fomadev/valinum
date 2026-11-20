/**
 * ValiNum v2
 *
 * Rwanda
 *
 * +250, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0781 234 567 / +250 781 234 567
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const RWANDA: CountryDefinition;
/**
 * Validate a Rwanda phone number.
 */
export declare function validateRwanda(input: string, options?: ValidationOptions): ValidationResult;
