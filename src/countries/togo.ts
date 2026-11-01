/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Togo
 *
 * +228, 8-digit national number, no trunk prefix.
 *
 * 90 12 34 56 / +228 90 12 34 56
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const TOGO: CountryDefinition = {
  info: {
    iso2: "TG",
    dialCode: "228",
    name: "Togo",
  },

  nationalLength: 8,
  trunkPrefix: null,

  ranges: [
    // Mobile
    // Formerly Togocom (Togo Cellulaire / Togo Telecom).
    ...ranges("Yas", "mobile", [
      "70", "71", "72", "73",
      "90", "91", "92", "93",
    ]),
    ...ranges("Moov Africa", "mobile", ["78", "79", "96", "97", "98", "99"]),

    // Fixed
    ...ranges("Yas", "fixed", [
      "222", "223", "224", "225", "226", "227",
      "232", "233",
      "244", "245",
      "255",
      "266", "267",
      "277",
    ]),
  ],

  ...groupedFormats("228", [2, 2, 2, 2]),
};

/**
 * Validate a Togo phone number.
 */
export function validateTogo(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, TOGO, options);
}
