/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Senegal
 *
 * +221, 9-digit national number, no trunk prefix.
 * Mobile numbers start with 7, fixed lines with 3.
 *
 * 77 123 45 67 / +221 77 123 45 67
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  ranges,
  validateWithDefinition,
} from "../core/engine";
import { formatGroups } from "../core/formatter";

export const SENEGAL: CountryDefinition = {
  info: {
    iso2: "SN",
    dialCode: "221",
    name: "Senegal",
  },

  nationalLength: 9,
  trunkPrefix: null,

  ranges: [
    // Mobile
    ...ranges("Orange", "mobile", ["71", "77", "78"]),
    // Formerly Free, formerly Tigo.
    ...ranges("Yas", "mobile", ["76"]),
    ...ranges("Expresso", "mobile", ["70"]),
    ...ranges("Promobile", "mobile", ["75"]),
    ...ranges("Hayo", "mobile", ["721"]),
    ...ranges("ADIE", "mobile", ["790"]),

    // Fixed
    ...ranges("Orange", "fixed", ["338", "339"]),
    ...ranges("Yas", "fixed", ["32"]),
    ...ranges("Expresso", "fixed", ["30"]),
    ...ranges("Hayo", "fixed", ["36"]),
  ],

  formatNational: (national) =>
    formatGroups(national, [2, 3, 2, 2]),
  formatInternational: (national) =>
    `+221 ${formatGroups(national, [2, 3, 2, 2])}`,
};

/**
 * Validate a Senegal phone number.
 */
export function validateSenegal(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, SENEGAL, options);
}
