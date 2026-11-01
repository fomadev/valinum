/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Zambia
 *
 * +260, 9-digit national number, trunk prefix 0.
 *
 * 097 123 4567 / +260 97 123 4567
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const ZAMBIA: CountryDefinition = {
  info: {
    iso2: "ZM",
    dialCode: "260",
    name: "Zambia",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    // Mobile
    ...ranges("Airtel", "mobile", ["97", "77", "57"]),
    ...ranges("MTN", "mobile", ["96", "76", "56"]),
    ...ranges("Zamtel", "mobile", ["95", "75", "55"]),
    // 078 and 058 are reserved for Zedmobile but not active yet.
    ...ranges("Zedmobile", "mobile", ["98"]),

    // Fixed
    ...ranges("Zamtel", "fixed", [
      "211", "212", "213", "214", "215", "216", "217", "218",
    ]),
  ],

  ...groupedFormats("260", [2, 3, 4], "0"),
};

/**
 * Validate a Zambia phone number.
 */
export function validateZambia(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, ZAMBIA, options);
}
