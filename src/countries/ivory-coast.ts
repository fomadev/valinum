/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Côte d'Ivoire
 *
 * +225, 10-digit national number since January 2021,
 * no trunk prefix. The first two digits identify the
 * operator: 01/21 Moov, 05/25 MTN, 07/27 Orange.
 *
 * 07 07 12 34 56 / +225 07 07 12 34 56
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  ranges,
  validateWithDefinition,
} from "../core/engine";
import { formatGroups } from "../core/formatter";

export const IVORY_COAST: CountryDefinition = {
  info: {
    iso2: "CI",
    dialCode: "225",
    name: "Côte d'Ivoire",
  },

  nationalLength: 10,
  trunkPrefix: null,

  ranges: [
    // Mobile
    ...ranges("Moov", "mobile", ["01"]),
    ...ranges("MTN", "mobile", ["05"]),
    ...ranges("Orange", "mobile", ["07"]),

    // Fixed
    ...ranges("Moov", "fixed", ["21"]),
    ...ranges("MTN", "fixed", ["25"]),
    ...ranges("Orange", "fixed", [
      "27202", "27203",
      "27212", "27213", "27215", "27217",
      "27222", "27224", "27225",
      "27234", "27235",
      "27243", "27244", "27245",
      "27306", "27316", "27319",
      "27327", "27337", "27347", "27357", "27367",
    ]),
  ],

  formatNational: (national) =>
    formatGroups(national, [2, 2, 2, 2, 2]),
  formatInternational: (national) =>
    `+225 ${formatGroups(national, [2, 2, 2, 2, 2])}`,
};

/**
 * Validate a Côte d'Ivoire phone number.
 */
export function validateIvoryCoast(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, IVORY_COAST, options);
}
