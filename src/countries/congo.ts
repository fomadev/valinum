/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Republic of the Congo (Congo-Brazzaville)
 *
 * +242, 9-digit national number, no trunk prefix:
 * the leading 0 of mobile numbers is part of the number.
 *
 * 06 123 4567 / +242 06 123 4567
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  ranges,
  validateWithDefinition,
} from "../core/engine";
import { formatGroups } from "../core/formatter";

export const CONGO: CountryDefinition = {
  info: {
    iso2: "CG",
    dialCode: "242",
    name: "Republic of the Congo",
  },

  nationalLength: 9,
  trunkPrefix: null,

  ranges: [
    // Mobile
    ...ranges("MTN", "mobile", ["06"]),
    ...ranges("Airtel", "mobile", ["05"]),
    // Former Warid range, taken over by Airtel.
    ...ranges("Airtel", "mobile", ["04"]),
    ...ranges("Equateur Telecom", "mobile", ["01"]),
    ...ranges("Congo Telecom", "mobile", [
      "0240",
      "0255", "0256", "0257", "0258",
      "0260", "0267", "0268", "0269",
      "02610", "02611", "02612", "02613", "02614", "02615",
      "02666", "02667", "02668", "02669",
    ]),

    // Fixed
    ...ranges("Congo Telecom", "fixed", [
      "2221", "2222", "2223", "2224", "2225", "2228", "2229",
    ]),
  ],

  formatNational: (national) =>
    formatGroups(national, [2, 3, 4]),
  formatInternational: (national) =>
    `+242 ${formatGroups(national, [2, 3, 4])}`,
};

/**
 * Validate a Republic of the Congo phone number.
 */
export function validateCongoBrazzaville(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, CONGO, options);
}
