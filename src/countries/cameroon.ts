/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Cameroon
 *
 * +237, 9-digit national number, no trunk prefix.
 * Mobile numbers start with 6, fixed lines with 2.
 *
 * 6 71 23 45 67 / +237 6 71 23 45 67
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  ranges,
  validateWithDefinition,
} from "../core/engine";
import { formatGroups } from "../core/formatter";

export const CAMEROON: CountryDefinition = {
  info: {
    iso2: "CM",
    dialCode: "237",
    name: "Cameroon",
  },

  nationalLength: 9,
  trunkPrefix: null,

  ranges: [
    // Mobile
    ...ranges("MTN", "mobile", [
      "650", "651", "652", "653", "654",
      "67",
      "680", "681", "682", "683",
    ]),
    ...ranges("Orange", "mobile", [
      "640", "641", "642",
      "655", "656", "657", "658", "659",
      "686", "687", "688", "689",
      "69",
    ]),
    ...ranges("Nexttel", "mobile", ["66", "684", "685"]),
    ...ranges("Camtel", "mobile", ["62", "242", "243"]),

    // Fixed
    ...ranges("Camtel", "fixed", ["222", "233"]),
  ],

  formatNational: (national) =>
    formatGroups(national, [1, 2, 2, 2, 2]),
  formatInternational: (national) =>
    `+237 ${formatGroups(national, [1, 2, 2, 2, 2])}`,
};

/**
 * Validate a Cameroon phone number.
 */
export function validateCameroon(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, CAMEROON, options);
}
