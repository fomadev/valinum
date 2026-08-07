/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
/**
 * Normalize a phone number's syntax.
 *
 * Examples:
 *
 * 082 470-80-27
 *     ↓
 * 0824708027
 *
 * +243 824 708 027
 *     ↓
 * +243824708027
 *
 * 00243 824 708 027
 *     ↓
 * +243824708027
 *
 * The function does not remove country codes.
 */
function normalize(input, accept00Prefix = true) {
    if (typeof input !== "string") {
        throw new TypeError("Phone number must be a string");
    }
    let value = input.trim();
    if (value.length === 0) {
        return {
            value: "",
            international: false,
        };
    }
    /*
     * Keep only characters that are useful for phone notation.
     *
     * We remove:
     * - spaces
     * - -
     * - (
     * - )
     * - .
     */
    value = value.replace(/[\s().-]/g, "");
    /*
     * Convert international dialing prefix 00 to +.
     *
     * Example:
     *
     * 00243824708027
     *        ↓
     * +243824708027
     */
    if (accept00Prefix && value.startsWith("00")) {
        value = `+${value.slice(2)}`;
    }
    /*
     * Detect international notation.
     */
    const international = value.startsWith("+");
    return {
        value,
        international,
    };
}

/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
/**
 * Parse a normalized number.
 *
 * IMPORTANT:
 * This parser does not contain country-specific rules.
 *
 * The country code is supplied by the country module.
 */
function parse(normalized, dialCode) {
    if (normalized.startsWith("+")) {
        const digits = normalized.slice(1);
        if (!digits.startsWith(dialCode)) {
            return {
                international: true,
                countryCode: null,
                nationalNumber: digits,
            };
        }
        return {
            international: true,
            countryCode: dialCode,
            nationalNumber: digits.slice(dialCode.length),
        };
    }
    /*
     * Number without +.
     *
     * Example:
     * 243824708027
     */
    if (normalized.startsWith(dialCode)) {
        return {
            international: true,
            countryCode: dialCode,
            nationalNumber: normalized.slice(dialCode.length),
        };
    }
    /*
     * National number.
     *
     * Example:
     * 0824708027
     */
    return {
        international: false,
        countryCode: null,
        nationalNumber: normalized,
    };
}

/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
/**
 * Validate the basic structure of a national number.
 */
function validateBasic(nationalNumber, expectedLength) {
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

/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
/**
 * Build E.164 representation.
 *
 * Example:
 *
 * countryCode = "243"
 * nationalNumber = "824708027"
 *
 * Result:
 *
 * +243824708027
 */
function formatE164(dialCode, nationalNumber) {
    return `+${dialCode}${nationalNumber}`;
}
/**
 * Build international representation.
 *
 * Example:
 *
 * +243 824 708 027
 */
function formatInternational(dialCode, nationalNumber) {
    return `+${dialCode} ${nationalNumber.slice(0, 3)} ${nationalNumber.slice(3, 6)} ${nationalNumber.slice(6)}`;
}
/**
 * Build national representation.
 *
 * Example:
 *
 * 082 470 8027
 */
function formatNational(nationalNumber) {
    return `0${nationalNumber.slice(0, 2)} ${nationalNumber.slice(2, 5)} ${nationalNumber.slice(5)}`;
}

/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
const DRC = {
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
const OPERATORS = {
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
function validateDRC(input, options = {}) {
    const { accept00Prefix = true, strict = false, } = options;
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
        const strictInternational = normalized.value.startsWith("+243") ||
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
    if (parsed.international &&
        national.startsWith("0")) {
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
    const basic = validateBasic(national, DRC_EXPECTED_LENGTH);
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
                international: formatInternational(DRC.dialCode, national),
                e164: formatE164(DRC.dialCode, national),
            },
            error: "INVALID_PREFIX",
        };
    }
    const operator = {
        name: operatorName,
        prefix,
    };
    /*
     * 7. FORMATTING
     */
    const number = {
        national: formatNational(national),
        international: formatInternational(DRC.dialCode, national),
        e164: formatE164(DRC.dialCode, national),
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

/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
/**
 * ValiNum v2
 */
const validate = validateDRC;

export { validate as default, formatE164, formatInternational, formatNational, normalize, parse, validate, validateBasic };
//# sourceMappingURL=valinum.mjs.map
