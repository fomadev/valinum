/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Democratic Republic of the Congo (DRC)
 */

import {
  CountryInfo,
  OperatorInfo,
  NumberInfo,
  ValidationOptions,
  ValidationResult,
} from "../types";

import { normalize } from "../core/normalize";
import { parse } from "../core/parser";
import { validateBasic } from "../core/validator";
import {
  formatE164,
  formatInternational,
  formatNational,
} from "../core/formatter";

const DRC: CountryInfo = {
  iso2: "CD",
  dialCode: "243",
  name: "Democratic Republic of the Congo",
};

const DRC_EXPECTED_LENGTH = 9;

/**
 * DRC operator prefixes.
 *
 * Only information relevant to phone validation
 * is stored here.
 */
const OPERATORS: Record<string, string> = {
  // Vodacom
  "81": "Vodacom",
  "82": "Vodacom",
  "83": "Vodacom",
  "86": "Vodacom",

  // Orange
  "80": "Orange",
  "84": "Orange",
  "85": "Orange",
  "89": "Orange",

  // Africell
  "90": "Africell",
  "91": "Africell",

  // Airtel
  "97": "Airtel",
  "98": "Airtel",
  "99": "Airtel",
};

/**
 * Validate a DRC phone number.
 */
export function validateDRC(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  const {
    accept00Prefix = true,
    strict = false,
  } = options;

  /*
   * 1. NORMALIZATION
   */
  const normalized = normalize(input, accept00Prefix);

  if (!normalized.value) {
    return {
      valid: false,
      country: DRC,
      operator: null,
      number: null,
      error: "EMPTY_INPUT",
    };
  }

  /*
   * 2. STRICT MODE
   *
   * In strict mode, only:
   *
   * +243XXXXXXXXX
   * 00243XXXXXXXXX
   * 243XXXXXXXXX
   *
   * are accepted.
   *
   * Note:
   * normalize() already converts 00243 to +243.
   */
  if (strict) {
    const strictInternational =
      normalized.value.startsWith("+243") ||
      normalized.value.startsWith("243");

    if (!strictInternational) {
      return {
        valid: false,
        country: DRC,
        operator: null,
        number: null,
        error: "INVALID_COUNTRY_CODE",
      };
    }
  }

  /*
   * 3. PARSING
   */
  const parsed = parse(normalized.value, DRC.dialCode);

  let national = parsed.nationalNumber;

  /*
   * 4. NATIONAL FORMAT
   *
   * 0824708027
   *     ↓
   * 824708027
   */
  if (!parsed.international && national.startsWith("0")) {
    national = national.slice(1);
  }

  /*
   * Prevent:
   *
   * +2430824708027
   *
   * The zero after +243 is not valid.
   */
  if (
    parsed.international &&
    national.startsWith("0")
  ) {
    return {
      valid: false,
      country: DRC,
      operator: null,
      number: null,
      error: "INVALID_PREFIX",
    };
  }

  /*
   * 5. BASIC VALIDATION
   */
  const basic = validateBasic(
    national,
    DRC_EXPECTED_LENGTH
  );

  if (!basic.valid) {
    return {
      valid: false,
      country: DRC,
      operator: null,
      number: null,
      error: basic.error,
    };
  }

  /*
   * 6. OPERATOR DETECTION
   */
  const prefix = national.slice(0, 2);

  const operatorName = OPERATORS[prefix];

  if (!operatorName) {
    return {
      valid: false,
      country: DRC,
      operator: null,
      number: {
        national: national,
        international: formatInternational(
          DRC.dialCode,
          national
        ),
        e164: formatE164(
          DRC.dialCode,
          national
        ),
      },
      error: "INVALID_PREFIX",
    };
  }

  const operator: OperatorInfo = {
    name: operatorName,
    prefix,
  };

  /*
   * 7. FORMATTING
   */
  const number: NumberInfo = {
    national: formatNational(national),
    international: formatInternational(
      DRC.dialCode,
      national
    ),
    e164: formatE164(
      DRC.dialCode,
      national
    ),
  };

  /*
   * 8. SUCCESS
   */
  return {
    valid: true,
    country: DRC,
    operator,
    number,
    error: null,
  };
}