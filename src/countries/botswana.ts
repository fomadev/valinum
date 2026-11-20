/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Botswana
 *
 * +267, 8-digit mobile number, no trunk prefix.
 * Fixed lines (7 digits) are not supported yet.
 *
 * 71 123 456 / +267 71 123 456
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const BOTSWANA: CountryDefinition = {
  info: {
    iso2: "BW",
    dialCode: "267",
    name: "Botswana",
  },

  nationalLength: 8,
  trunkPrefix: null,

  ranges: [
    ...ranges("Mascom", "mobile", [
      "71", "74",
      "754", "755", "756", "759",
      "760", "761", "762", "766", "767",
      "770", "771", "776", "777", "778",
      "789",
      "7923", "7924", "7925", "7926", "7927",
    ]),
    ...ranges("Orange", "mobile", [
      "72", "743", "744", "748",
      "750", "751", "752", "753", "757",
      "763", "764", "765", "769",
      "773", "774", "775", "779",
      "78",
      "790", "7920", "7922", "793",
    ]),
    // Botswana Telecommunications Corporation (formerly beMOBILE).
    ...ranges("BTC", "mobile", [
      "73", "749", "758", "768", "772", "7921",
    ]),
  ],

  ...groupedFormats("267", [2, 3, 3]),
};

/**
 * Validate a Botswana phone number.
 */
export function validateBotswana(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, BOTSWANA, options);
}
