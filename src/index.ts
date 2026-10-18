/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Supported countries:
 * - CD: Democratic Republic of the Congo
 * - CG: Republic of the Congo (Congo-Brazzaville)
 * - CM: Cameroon
 * - CI: Côte d'Ivoire
 * - SN: Senegal
 */

export * from "./types";
export * from "./core/normalize";
export * from "./core/parser";
export * from "./core/validator";
export * from "./core/formatter";

export { getSupportedCountries } from "./countries";
export { validateDRC } from "./countries/drc";
export { validateCongoBrazzaville } from "./countries/congo";
export { validateCameroon } from "./countries/cameroon";
export { validateIvoryCoast } from "./countries/ivory-coast";
export { validateSenegal } from "./countries/senegal";

/**
 * Validate a phone number from any supported country.
 *
 * National numbers default to the DRC
 * (see the defaultCountry option).
 */
export { validate } from "./validate";
