import { CountryCode, CountryInfo } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const COUNTRIES: Record<CountryCode, CountryDefinition>;
/**
 * Countries grouped by the release that added them.
 *
 * Auto-detection of national numbers tries older groups
 * first, so adding a country never changes how a number
 * that ValiNum already recognized is interpreted.
 */
export declare const DETECTION_TIERS: CountryCode[][];
/**
 * Resolve a country code (case-insensitive).
 */
export declare function getCountryDefinition(code: string): CountryDefinition;
/**
 * List every country ValiNum can validate.
 */
export declare function getSupportedCountries(): CountryInfo[];
