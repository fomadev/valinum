/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * South Sudan
 *
 * +211, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0921 234 567 / +211 921 234 567
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const SOUTH_SUDAN: CountryDefinition = {
  info: {
    iso2: "SS",
    dialCode: "211",
    name: "South Sudan",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("Zain", "mobile", ["91"]),
    ...ranges("MTN", "mobile", ["92"]),
    ...ranges("Digitel", "mobile", ["98"]),
    // 95 (Vivacell, closed in 2018) and 97 (Gemtel) are not active.
  ],

  ...groupedFormats("211", [3, 3, 3], "0"),
};

/**
 * Validate a South Sudan phone number.
 */
export function validateSouthSudan(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, SOUTH_SUDAN, options);
}
