/**
 * ValiNum v2
 *
 * Zambia
 *
 * +260, 9-digit national number, trunk prefix 0.
 *
 * 097 123 4567 / +260 97 123 4567
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const ZAMBIA: CountryDefinition;
/**
 * Validate a Zambia phone number.
 */
export declare function validateZambia(input: string, options?: ValidationOptions): ValidationResult;
