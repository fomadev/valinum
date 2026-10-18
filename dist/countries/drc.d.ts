/**
 * ValiNum v2
 *
 * Democratic Republic of the Congo (DRC)
 *
 * +243, 9-digit national number, trunk prefix 0.
 *
 * 082 470 8027 / +243 824 708 027
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const DRC: CountryDefinition;
/**
 * Validate a DRC phone number.
 */
export declare function validateDRC(input: string, options?: ValidationOptions): ValidationResult;
