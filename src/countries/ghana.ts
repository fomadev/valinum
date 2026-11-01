/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Ghana
 *
 * +233, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 024 123 4567 / +233 24 123 4567
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine";

export const GHANA: CountryDefinition = {
  info: {
    iso2: "GH",
    dialCode: "233",
    name: "Ghana",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("MTN", "mobile", [
      "24", "256", "257",
      "53", "54", "55",
      "591", "592", "593", "594", "595", "596", "597", "598", "599",
    ]),
    // Formerly Vodafone Ghana.
    ...ranges("Telecel", "mobile", ["20", "50"]),
    // Formerly AirtelTigo.
    ...ranges("AT", "mobile", ["23", "26", "27", "56", "57"]),
  ],

  ...groupedFormats("233", [2, 3, 4], "0"),
};

/**
 * Validate a Ghana phone number.
 */
export function validateGhana(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, GHANA, options);
}
