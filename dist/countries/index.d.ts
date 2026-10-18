import { CountryCode, CountryInfo } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const COUNTRIES: Record<CountryCode, CountryDefinition>;
/**
 * Resolve a country code (case-insensitive).
 */
export declare function getCountryDefinition(code: string): CountryDefinition;
/**
 * List every country ValiNum can validate.
 */
export declare function getSupportedCountries(): CountryInfo[];
