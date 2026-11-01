/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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
export { validateAngola } from "./countries/angola";
export { validateGabon } from "./countries/gabon";
export { validateCentralAfricanRepublic } from "./countries/central-african-republic";
export { validateEquatorialGuinea } from "./countries/equatorial-guinea";
export { validateNigeria } from "./countries/nigeria";
export { validateBenin } from "./countries/benin";
export { validateTogo } from "./countries/togo";
export { validateGhana } from "./countries/ghana";
export { validateZambia } from "./countries/zambia";
export { validateBurkinaFaso } from "./countries/burkina-faso";

/**
 * Validate a phone number from any supported country.
 *
 * National numbers default to the DRC
 * (see the defaultCountry option).
 */
export { validate } from "./validate";
