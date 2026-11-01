/**
 * ValiNum v2
 *
 * Ghana
 *
 * +233, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 024 123 4567 / +233 24 123 4567
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const GHANA: CountryDefinition;
/**
 * Validate a Ghana phone number.
 */
export declare function validateGhana(input: string, options?: ValidationOptions): ValidationResult;
