/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * Country-agnostic validation engine.
 *
 * Every country module only describes its numbering plan
 * (a CountryDefinition). The engine applies the same
 * pipeline to all of them:
 *
 * normalize → strict check → parse → trunk prefix
 *           → length → operator/range → formatting
 */

import {
  CountryInfo,
  LineType,
  NumberInfo,
  ValidationOptions,
  ValidationResult,
} from "../types";

import { normalize } from "./normalize";
import { parse } from "./parser";
import { validateBasic } from "./validator";
import { formatE164 } from "./formatter";

/**
 * One allocated block of the national numbering plan.
 */
export interface NumberRange {
  /** Leading digits of the national number. */
  prefix: string;
  operator: string;
  lineType: LineType;
}

export interface CountryDefinition {
  info: CountryInfo;

  /** Length of the national significant number. */
  nationalLength: number;

  /**
   * Trunk prefix dialled before national numbers
   * ("0" in the DRC), or null when the country has none.
   */
  trunkPrefix: string | null;

  ranges: NumberRange[];

  formatNational(nationalNumber: string): string;
  formatInternational(nationalNumber: string): string;
}

/**
 * Build ranges sharing the same operator and line type.
 */
export function ranges(
  operator: string,
  lineType: LineType,
  prefixes: string[]
): NumberRange[] {
  return prefixes.map((prefix) => ({
    prefix,
    operator,
    lineType,
  }));
}

/**
 * Find the most specific range matching a national number.
 */
export function findRange(
  nationalNumber: string,
  numberRanges: NumberRange[]
): NumberRange | null {
  let best: NumberRange | null = null;

  for (const range of numberRanges) {
    if (
      nationalNumber.startsWith(range.prefix) &&
      (!best || range.prefix.length > best.prefix.length)
    ) {
      best = range;
    }
  }

  return best;
}

function failure(
  country: CountryInfo | null,
  error: ValidationResult["error"],
  number: NumberInfo | null = null
): ValidationResult {
  return {
    valid: false,
    country,
    operator: null,
    number,
    lineType: null,
    error,
  };
}

/**
 * Validate a phone number against one country definition.
 */
export function validateWithDefinition(
  input: string,
  definition: CountryDefinition,
  options: ValidationOptions = {}
): ValidationResult {
  const {
    accept00Prefix = true,
    strict = false,
  } = options;

  const { info } = definition;

  /*
   * 1. NORMALIZATION
   */
  const normalized = normalize(input, accept00Prefix);

  if (!normalized.value) {
    return failure(info, "EMPTY_INPUT");
  }

  /*
   * 2. STRICT MODE
   *
   * Only +CC..., 00CC... and CC... are accepted.
   * normalize() already converts 00 to +.
   */
  if (strict) {
    const strictInternational =
      normalized.value.startsWith(`+${info.dialCode}`) ||
      normalized.value.startsWith(info.dialCode);

    if (!strictInternational) {
      return failure(info, "INVALID_COUNTRY_CODE");
    }
  }

  /*
   * 3. PARSING
   */
  const parsed = parse(normalized.value, info.dialCode);

  /*
   * +33..., +1... : another country's number.
   */
  if (parsed.international && parsed.countryCode === null) {
    return failure(info, "INVALID_COUNTRY_CODE");
  }

  let national = parsed.nationalNumber;

  /*
   * 4. TRUNK PREFIX
   *
   * DRC: 0824708027 → 824708027
   *
   * The trunk prefix is never valid after the
   * country code: +2430824708027 is rejected.
   */
  const { trunkPrefix } = definition;

  if (trunkPrefix && national.startsWith(trunkPrefix)) {
    if (parsed.international) {
      return failure(info, "INVALID_PREFIX");
    }

    national = national.slice(trunkPrefix.length);
  }

  /*
   * 5. BASIC VALIDATION
   */
  const basic = validateBasic(
    national,
    definition.nationalLength
  );

  if (!basic.valid) {
    return failure(info, basic.error);
  }

  /*
   * 6. OPERATOR / RANGE DETECTION
   */
  const range = findRange(national, definition.ranges);

  if (!range) {
    return failure(info, "INVALID_PREFIX", {
      national,
      international: definition.formatInternational(national),
      e164: formatE164(info.dialCode, national),
    });
  }

  /*
   * 7. SUCCESS
   */
  return {
    valid: true,
    country: info,
    operator: {
      name: range.operator,
      prefix: range.prefix,
    },
    number: {
      national: definition.formatNational(national),
      international: definition.formatInternational(national),
      e164: formatE164(info.dialCode, national),
    },
    lineType: range.lineType,
    error: null,
  };
}
