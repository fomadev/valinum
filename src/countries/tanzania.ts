/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Tanzania
 *
 * +255, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0754 123 456 / +255 754 123 456
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const TANZANIA: CountryDefinition = {
  info: {
    iso2: "TZ",
    dialCode: "255",
    name: "Tanzania",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("Vodacom", "mobile", ["72", "74", "75", "76", "79"]),
    ...ranges("Airtel", "mobile", ["60", "66", "68", "69", "78"]),
    // Formerly Tigo and Zantel.
    ...ranges("Yas", "mobile", ["65", "67", "70", "71", "77"]),
    // Viettel Tanzania.
    ...ranges("Halotel", "mobile", ["61", "62", "63"]),
    ...ranges("TTCL", "mobile", ["73"]),
  ],

  ...groupedFormats("255", [3, 3, 3], "0"),
};

/**
 * Validate a Tanzania phone number.
 */
export function validateTanzania(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, TANZANIA, options);
}
