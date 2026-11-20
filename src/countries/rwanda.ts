/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Rwanda
 *
 * +250, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0781 234 567 / +250 781 234 567
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const RWANDA: CountryDefinition = {
  info: {
    iso2: "RW",
    dialCode: "250",
    name: "Rwanda",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("MTN", "mobile", ["78", "79"]),
    ...ranges("Airtel", "mobile", ["72", "73"]),
    // KT Rwanda Networks (4G LTE).
    ...ranges("KTRN", "mobile", ["77"]),
  ],

  ...groupedFormats("250", [3, 3, 3], "0"),
};

/**
 * Validate a Rwanda phone number.
 */
export function validateRwanda(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, RWANDA, options);
}
