/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Zimbabwe
 *
 * +263, 9-digit mobile number, trunk prefix 0.
 * Fixed lines (variable length) are not supported yet.
 *
 * 077 123 4567 / +263 77 123 4567
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const ZIMBABWE: CountryDefinition = {
  info: {
    iso2: "ZW",
    dialCode: "263",
    name: "Zimbabwe",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("NetOne", "mobile", ["71", "72"]),
    ...ranges("Telecel", "mobile", ["73"]),
    ...ranges("Econet", "mobile", ["77", "78"]),
  ],

  ...groupedFormats("263", [2, 3, 4], "0"),
};

/**
 * Validate a Zimbabwe phone number.
 */
export function validateZimbabwe(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, ZIMBABWE, options);
}
