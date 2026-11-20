/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Malawi
 *
 * +265, 9-digit mobile number, trunk prefix 0.
 * Fixed lines (7 digits) are not supported yet.
 *
 * 0991 23 45 67 / +265 991 23 45 67
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const MALAWI: CountryDefinition = {
  info: {
    iso2: "MW",
    dialCode: "265",
    name: "Malawi",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("Airtel", "mobile", ["98", "99"]),
    ...ranges("TNM", "mobile", ["88", "89"]),
  ],

  ...groupedFormats("265", [3, 2, 2, 2], "0"),
};

/**
 * Validate a Malawi phone number.
 */
export function validateMalawi(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, MALAWI, options);
}
