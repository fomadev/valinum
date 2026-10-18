/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

export interface BasicValidationResult {
  valid: boolean;
  error:
    | "EMPTY_INPUT"
    | "INVALID_CHARACTERS"
    | "TOO_SHORT"
    | "TOO_LONG"
    | null;
}

/**
 * Validate the basic structure of a national number.
 */
export function validateBasic(
  nationalNumber: string,
  expectedLength: number
): BasicValidationResult {
  if (nationalNumber.length === 0) {
    return {
      valid: false,
      error: "EMPTY_INPUT",
    };
  }

  /*
   * At this stage, the number must contain digits only.
   */
  if (!/^\d+$/.test(nationalNumber)) {
    return {
      valid: false,
      error: "INVALID_CHARACTERS",
    };
  }

  if (nationalNumber.length < expectedLength) {
    return {
      valid: false,
      error: "TOO_SHORT",
    };
  }

  if (nationalNumber.length > expectedLength) {
    return {
      valid: false,
      error: "TOO_LONG",
    };
  }

  return {
    valid: true,
    error: null,
  };
}