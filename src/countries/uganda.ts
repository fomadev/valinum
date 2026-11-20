/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Uganda
 *
 * +256, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0772 123 456 / +256 772 123 456
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const UGANDA: CountryDefinition = {
  info: {
    iso2: "UG",
    dialCode: "256",
    name: "Uganda",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("MTN", "mobile", [
      "76", "77", "78",
      "790", "791", "792", "793", "794", "795",
      "724", "737",
    ]),
    ...ranges("Airtel", "mobile", ["70", "74", "75", "730", "731", "732"]),
    // Uganda Telecom.
    ...ranges("UTL", "mobile", ["71"]),
    ...ranges("Lycamobile", "mobile", ["721", "726", "727"]),
    ...ranges("Talkio", "mobile", ["7280"]),
    // 720 (Smile) and 798/799 (Africell) closed.
  ],

  ...groupedFormats("256", [3, 3, 3], "0"),
};

/**
 * Validate a Uganda phone number.
 */
export function validateUganda(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, UGANDA, options);
}
