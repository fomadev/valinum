/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Angola
 *
 * +244, 9-digit national number, no trunk prefix.
 * Mobile numbers start with 9.
 *
 * 923 123 456 / +244 923 123 456
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine";

export const ANGOLA: CountryDefinition = {
  info: {
    iso2: "AO",
    dialCode: "244",
    name: "Angola",
  },

  nationalLength: 9,
  trunkPrefix: null,

  ranges: [
    ...ranges("Unitel", "mobile", ["92", "93", "94", "97"]),
    ...ranges("Movicel", "mobile", ["91", "99"]),
    ...ranges("Africell", "mobile", ["95", "96"]),
  ],

  ...groupedFormats("244", [3, 3, 3]),
};

/**
 * Validate an Angola phone number.
 */
export function validateAngola(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, ANGOLA, options);
}
