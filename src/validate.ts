/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * Smart validation with automatic country detection.
 *
 * - +243..., 00242..., +237...: the country is read
 *   from the country code.
 * - 237677123456 (country code without +): detected
 *   when the length matches that country's plan.
 * - 0824708027, 771234567 (national numbers): the
 *   default country is tried first; if it rejects the
 *   number and exactly one other country accepts it,
 *   that country wins. Ambiguous numbers are never
 *   guessed, and countries added in later releases
 *   never take over a number an earlier release
 *   already recognized.
 */

import {
  CountryCode,
  ValidationOptions,
  ValidationResult,
} from "./types.js";
import { CountryDefinition, validateWithDefinition } from "./core/engine.js";
import { normalize } from "./core/normalize.js";
import {
  COUNTRIES,
  DETECTION_TIERS,
  getCountryDefinition,
} from "./countries/index.js";

function candidates(
  options: ValidationOptions
): CountryDefinition[] {
  const allowed = (
    options.countries?.length
      ? options.countries
      : (Object.keys(COUNTRIES) as CountryCode[])
  ).map(getCountryDefinition);

  const preferred = getCountryDefinition(
    options.defaultCountry ?? "CD"
  );

  /*
   * The default country always comes first, as long
   * as it is part of the allowed countries.
   */
  return allowed.includes(preferred)
    ? [preferred, ...allowed.filter((c) => c !== preferred)]
    : allowed;
}

/**
 * Validate a phone number from any supported country.
 */
export function validate(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  if (options.country) {
    return validateWithDefinition(
      input,
      getCountryDefinition(options.country),
      options
    );
  }

  const [primary, ...others] = candidates(options);

  const normalized = normalize(
    input,
    options.accept00Prefix ?? true
  );

  /*
   * 1. EXPLICIT INTERNATIONAL NUMBER (+ or 00)
   */
  if (normalized.value && normalized.international) {
    const digits = normalized.value.slice(1);
    const definition = [primary, ...others].find((c) =>
      digits.startsWith(c.info.dialCode)
    );

    if (!definition) {
      return {
        valid: false,
        country: null,
        operator: null,
        number: null,
        lineType: null,
        error: "INVALID_COUNTRY_CODE",
      };
    }

    return validateWithDefinition(input, definition, options);
  }

  /*
   * 2. DEFAULT COUNTRY
   */
  const primaryResult = validateWithDefinition(
    input,
    primary,
    options
  );

  if (primaryResult.valid || !normalized.value) {
    return primaryResult;
  }

  /*
   * 3. COUNTRY CODE WITHOUT +
   *
   * 237677123456 → Cameroon
   */
  for (const definition of others) {
    const { dialCode } = definition.info;

    if (
      normalized.value.startsWith(dialCode) &&
      normalized.value.length ===
        dialCode.length + definition.nationalLength
    ) {
      const result = validateWithDefinition(
        input,
        definition,
        options
      );

      if (result.valid) {
        return result;
      }
    }
  }

  /*
   * 4. NATIONAL NUMBER OF ANOTHER COUNTRY
   *
   * Only when a single country recognizes it. Older
   * tiers are tried first; an ambiguous tier stops the
   * search instead of guessing.
   */
  if (!options.strict) {
    for (const tier of DETECTION_TIERS) {
      const matches = others
        .filter((c) => tier.includes(c.info.iso2 as CountryCode))
        .map((c) => validateWithDefinition(input, c, options))
        .filter((r) => r.valid);

      if (matches.length === 1) {
        return matches[0];
      }

      if (matches.length > 1) {
        break;
      }
    }
  }

  return primaryResult;
}
