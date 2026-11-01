/**
 * ValiNum v2
 *
 * Supported countries:
 * - CD: Democratic Republic of the Congo
 * - CG: Republic of the Congo (Congo-Brazzaville)
 * - CM: Cameroon
 * - CI: Côte d'Ivoire
 * - SN: Senegal
 * - AO: Angola
 * - GA: Gabon
 * - CF: Central African Republic
 * - GQ: Equatorial Guinea
 * - NG: Nigeria
 * - BJ: Benin
 * - TG: Togo
 * - GH: Ghana
 * - ZM: Zambia
 * - BF: Burkina Faso
 */
export * from "./types.js";
export * from "./core/normalize.js";
export * from "./core/parser.js";
export * from "./core/validator.js";
export * from "./core/formatter.js";
export { getSupportedCountries } from "./countries/index.js";
export { validateDRC } from "./countries/drc.js";
export { validateCongoBrazzaville } from "./countries/congo.js";
export { validateCameroon } from "./countries/cameroon.js";
export { validateIvoryCoast } from "./countries/ivory-coast.js";
export { validateSenegal } from "./countries/senegal.js";
export { validateAngola } from "./countries/angola.js";
export { validateGabon } from "./countries/gabon.js";
export { validateCentralAfricanRepublic } from "./countries/central-african-republic.js";
export { validateEquatorialGuinea } from "./countries/equatorial-guinea.js";
export { validateNigeria } from "./countries/nigeria.js";
export { validateBenin } from "./countries/benin.js";
export { validateTogo } from "./countries/togo.js";
export { validateGhana } from "./countries/ghana.js";
export { validateZambia } from "./countries/zambia.js";
export { validateBurkinaFaso } from "./countries/burkina-faso.js";
/**
 * Validate a phone number from any supported country.
 *
 * National numbers default to the DRC
 * (see the defaultCountry option).
 */
export { validate } from "./validate.js";
