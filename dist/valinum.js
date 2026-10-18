(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ValiNum = {}));
})(this, (function (exports) { 'use strict';

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
    /**
     * Split digits into groups separated by spaces.
     *
     * Example:
     *
     * formatGroups("771234567", [2, 3, 2, 2])
     *
     * Result:
     *
     * 77 123 45 67
     */
    function formatGroups(digits, groups) {
        const parts = [];
        let index = 0;
        for (const size of groups) {
            if (index >= digits.length) {
                break;
            }
            parts.push(digits.slice(index, index + size));
            index += size;
        }
        if (index < digits.length) {
            parts.push(digits.slice(index));
        }
        return parts.join(" ");
    }

    /* * Copyright (c) 2026 Fordi / FomaDev.
     * Licensed under FomaDev Public License.
     * See LICENSE file in the project root for full license information.
     */
    /**
     * Build ranges sharing the same operator and line type.
     */
    function ranges(operator, lineType, prefixes) {
        return prefixes.map((prefix) => ({
            prefix,
            operator,
            lineType,
        }));
    }
    /**
     * Find the most specific range matching a national number.
     */
    function findRange(nationalNumber, numberRanges) {
        let best = null;
        for (const range of numberRanges) {
            if (nationalNumber.startsWith(range.prefix) &&
                (!best || range.prefix.length > best.prefix.length)) {
                best = range;
            }
        }
        return best;
    }
    function failure(country, error, number = null) {
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
    function validateWithDefinition(input, definition, options = {}) {
        const { accept00Prefix = true, strict = false, } = options;
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
            const strictInternational = normalized.value.startsWith(`+${info.dialCode}`) ||
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
        const basic = validateBasic(national, definition.nationalLength);
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

    /* * Copyright (c) 2026 Fordi / FomaDev.
     * Licensed under FomaDev Public License.
     * See LICENSE file in the project root for full license information.
     */
    const DRC = {
        info: {
            iso2: "CD",
            dialCode: "243",
            name: "Democratic Republic of the Congo",
        },
        nationalLength: 9,
        trunkPrefix: "0",
        ranges: [
            ...ranges("Vodacom", "mobile", ["81", "82", "83", "86"]),
            ...ranges("Orange", "mobile", ["80", "84", "85", "89"]),
            ...ranges("Africell", "mobile", ["90", "91"]),
            ...ranges("Airtel", "mobile", ["97", "98", "99"]),
        ],
        formatNational,
        formatInternational: (national) => formatInternational("243", national),
    };
    /**
     * Validate a DRC phone number.
     */
    function validateDRC(input, options = {}) {
        return validateWithDefinition(input, DRC, options);
    }

    /* * Copyright (c) 2026 Fordi / FomaDev.
     * Licensed under FomaDev Public License.
     * See LICENSE file in the project root for full license information.
     */
    const CONGO = {
        info: {
            iso2: "CG",
            dialCode: "242",
            name: "Republic of the Congo",
        },
        nationalLength: 9,
        trunkPrefix: null,
        ranges: [
            // Mobile
            ...ranges("MTN", "mobile", ["06"]),
            ...ranges("Airtel", "mobile", ["05"]),
            // Former Warid range, taken over by Airtel.
            ...ranges("Airtel", "mobile", ["04"]),
            ...ranges("Equateur Telecom", "mobile", ["01"]),
            ...ranges("Congo Telecom", "mobile", [
                "0240",
                "0255", "0256", "0257", "0258",
                "0260", "0267", "0268", "0269",
                "02610", "02611", "02612", "02613", "02614", "02615",
                "02666", "02667", "02668", "02669",
            ]),
            // Fixed
            ...ranges("Congo Telecom", "fixed", [
                "2221", "2222", "2223", "2224", "2225", "2228", "2229",
            ]),
        ],
        formatNational: (national) => formatGroups(national, [2, 3, 4]),
        formatInternational: (national) => `+242 ${formatGroups(national, [2, 3, 4])}`,
    };
    /**
     * Validate a Republic of the Congo phone number.
     */
    function validateCongoBrazzaville(input, options = {}) {
        return validateWithDefinition(input, CONGO, options);
    }

    /* * Copyright (c) 2026 Fordi / FomaDev.
     * Licensed under FomaDev Public License.
     * See LICENSE file in the project root for full license information.
     */
    const CAMEROON = {
        info: {
            iso2: "CM",
            dialCode: "237",
            name: "Cameroon",
        },
        nationalLength: 9,
        trunkPrefix: null,
        ranges: [
            // Mobile
            ...ranges("MTN", "mobile", [
                "650", "651", "652", "653", "654",
                "67",
                "680", "681", "682", "683",
            ]),
            ...ranges("Orange", "mobile", [
                "640", "641", "642",
                "655", "656", "657", "658", "659",
                "686", "687", "688", "689",
                "69",
            ]),
            ...ranges("Nexttel", "mobile", ["66", "684", "685"]),
            ...ranges("Camtel", "mobile", ["62", "242", "243"]),
            // Fixed
            ...ranges("Camtel", "fixed", ["222", "233"]),
        ],
        formatNational: (national) => formatGroups(national, [1, 2, 2, 2, 2]),
        formatInternational: (national) => `+237 ${formatGroups(national, [1, 2, 2, 2, 2])}`,
    };
    /**
     * Validate a Cameroon phone number.
     */
    function validateCameroon(input, options = {}) {
        return validateWithDefinition(input, CAMEROON, options);
    }

    /* * Copyright (c) 2026 Fordi / FomaDev.
     * Licensed under FomaDev Public License.
     * See LICENSE file in the project root for full license information.
     */
    const IVORY_COAST = {
        info: {
            iso2: "CI",
            dialCode: "225",
            name: "Côte d'Ivoire",
        },
        nationalLength: 10,
        trunkPrefix: null,
        ranges: [
            // Mobile
            ...ranges("Moov", "mobile", ["01"]),
            ...ranges("MTN", "mobile", ["05"]),
            ...ranges("Orange", "mobile", ["07"]),
            // Fixed
            ...ranges("Moov", "fixed", ["21"]),
            ...ranges("MTN", "fixed", ["25"]),
            ...ranges("Orange", "fixed", [
                "27202", "27203",
                "27212", "27213", "27215", "27217",
                "27222", "27224", "27225",
                "27234", "27235",
                "27243", "27244", "27245",
                "27306", "27316", "27319",
                "27327", "27337", "27347", "27357", "27367",
            ]),
        ],
        formatNational: (national) => formatGroups(national, [2, 2, 2, 2, 2]),
        formatInternational: (national) => `+225 ${formatGroups(national, [2, 2, 2, 2, 2])}`,
    };
    /**
     * Validate a Côte d'Ivoire phone number.
     */
    function validateIvoryCoast(input, options = {}) {
        return validateWithDefinition(input, IVORY_COAST, options);
    }

    /* * Copyright (c) 2026 Fordi / FomaDev.
     * Licensed under FomaDev Public License.
     * See LICENSE file in the project root for full license information.
     */
    const SENEGAL = {
        info: {
            iso2: "SN",
            dialCode: "221",
            name: "Senegal",
        },
        nationalLength: 9,
        trunkPrefix: null,
        ranges: [
            // Mobile
            ...ranges("Orange", "mobile", ["71", "77", "78"]),
            // Formerly Free, formerly Tigo.
            ...ranges("Yas", "mobile", ["76"]),
            ...ranges("Expresso", "mobile", ["70"]),
            ...ranges("Promobile", "mobile", ["75"]),
            ...ranges("Hayo", "mobile", ["721"]),
            ...ranges("ADIE", "mobile", ["790"]),
            // Fixed
            ...ranges("Orange", "fixed", ["338", "339"]),
            ...ranges("Yas", "fixed", ["32"]),
            ...ranges("Expresso", "fixed", ["30"]),
            ...ranges("Hayo", "fixed", ["36"]),
        ],
        formatNational: (national) => formatGroups(national, [2, 3, 2, 2]),
        formatInternational: (national) => `+221 ${formatGroups(national, [2, 3, 2, 2])}`,
    };
    /**
     * Validate a Senegal phone number.
     */
    function validateSenegal(input, options = {}) {
        return validateWithDefinition(input, SENEGAL, options);
    }

    /* * Copyright (c) 2026 Fordi / FomaDev.
     * Licensed under FomaDev Public License.
     * See LICENSE file in the project root for full license information.
     */
    const COUNTRIES = {
        CD: DRC,
        CG: CONGO,
        CM: CAMEROON,
        CI: IVORY_COAST,
        SN: SENEGAL,
    };
    /**
     * Resolve a country code (case-insensitive).
     */
    function getCountryDefinition(code) {
        const definition = COUNTRIES[code.toUpperCase()];
        if (!definition) {
            throw new RangeError(`Unsupported country: ${code}`);
        }
        return definition;
    }
    /**
     * List every country ValiNum can validate.
     */
    function getSupportedCountries() {
        return Object.values(COUNTRIES).map((c) => c.info);
    }

    /* * Copyright (c) 2026 Fordi / FomaDev.
     * Licensed under FomaDev Public License.
     * See LICENSE file in the project root for full license information.
     */
    function candidates(options) {
        const allowed = (options.countries?.length
            ? options.countries
            : Object.keys(COUNTRIES)).map(getCountryDefinition);
        const preferred = getCountryDefinition(options.defaultCountry ?? "CD");
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
    function validate(input, options = {}) {
        if (options.country) {
            return validateWithDefinition(input, getCountryDefinition(options.country), options);
        }
        const [primary, ...others] = candidates(options);
        const normalized = normalize(input, options.accept00Prefix ?? true);
        /*
         * 1. EXPLICIT INTERNATIONAL NUMBER (+ or 00)
         */
        if (normalized.value && normalized.international) {
            const digits = normalized.value.slice(1);
            const definition = [primary, ...others].find((c) => digits.startsWith(c.info.dialCode));
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
        const primaryResult = validateWithDefinition(input, primary, options);
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
            if (normalized.value.startsWith(dialCode) &&
                normalized.value.length ===
                    dialCode.length + definition.nationalLength) {
                const result = validateWithDefinition(input, definition, options);
                if (result.valid) {
                    return result;
                }
            }
        }
        /*
         * 4. NATIONAL NUMBER OF ANOTHER COUNTRY
         *
         * Only when a single country recognizes it.
         */
        if (!options.strict) {
            const matches = others
                .map((c) => validateWithDefinition(input, c, options))
                .filter((r) => r.valid);
            if (matches.length === 1) {
                return matches[0];
            }
        }
        return primaryResult;
    }

    exports.formatE164 = formatE164;
    exports.formatGroups = formatGroups;
    exports.formatInternational = formatInternational;
    exports.formatNational = formatNational;
    exports.getSupportedCountries = getSupportedCountries;
    exports.normalize = normalize;
    exports.parse = parse;
    exports.validate = validate;
    exports.validateBasic = validateBasic;
    exports.validateCameroon = validateCameroon;
    exports.validateCongoBrazzaville = validateCongoBrazzaville;
    exports.validateDRC = validateDRC;
    exports.validateIvoryCoast = validateIvoryCoast;
    exports.validateSenegal = validateSenegal;

}));
//# sourceMappingURL=valinum.js.map
