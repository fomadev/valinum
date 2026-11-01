'use strict';

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
/**
 * Build ranges sharing the same operator and line type.
 */
function ranges(operator, lineType, prefixes, pattern) {
    return prefixes.map((prefix) => ({
        prefix,
        operator,
        lineType,
        ...(pattern && { pattern }),
    }));
}
/**
 * Build the national and international formatters of a
 * country from its digit groups.
 *
 * groupedFormats("233", [2, 3, 4], "0")
 *
 * national:      024 123 4567
 * international: +233 24 123 4567
 */
function groupedFormats(dialCode, groups, nationalPrefix = "") {
    return {
        formatNational: (national) => nationalPrefix + formatGroups(national, groups),
        formatInternational: (national) => `+${dialCode} ${formatGroups(national, groups)}`,
    };
}
/**
 * Find the most specific range matching a national number.
 */
function findRange(nationalNumber, numberRanges) {
    let best = null;
    for (const range of numberRanges) {
        if (nationalNumber.startsWith(range.prefix) &&
            (!range.pattern || range.pattern.test(nationalNumber)) &&
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const ANGOLA = {
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
function validateAngola(input, options = {}) {
    return validateWithDefinition(input, ANGOLA, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const GABON = {
    info: {
        iso2: "GA",
        dialCode: "241",
        name: "Gabon",
    },
    nationalLength: 8,
    trunkPrefix: "0",
    ranges: [
        // Mobile
        ...ranges("Airtel", "mobile", ["74", "76", "77"]),
        // Gabon Telecom (formerly Libertis and Moov).
        ...ranges("Moov Africa", "mobile", [
            "600", "601", "602", "603", "604",
            "610",
            "62", "65", "66",
        ]),
        // Fixed
        ...ranges("Moov Africa", "fixed", ["11"]),
    ],
    ...groupedFormats("241", [2, 2, 2, 2], "0"),
};
/**
 * Validate a Gabon phone number.
 */
function validateGabon(input, options = {}) {
    return validateWithDefinition(input, GABON, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const CENTRAL_AFRICAN_REPUBLIC = {
    info: {
        iso2: "CF",
        dialCode: "236",
        name: "Central African Republic",
    },
    nationalLength: 8,
    trunkPrefix: null,
    ranges: [
        // Mobile
        ...ranges("Orange", "mobile", ["72", "73", "74"]),
        ...ranges("Telecel", "mobile", ["75", "76"]),
        ...ranges("Moov Africa", "mobile", ["70"]),
        // Fixed
        ...ranges("Socatel", "fixed", ["21", "22"]),
    ],
    ...groupedFormats("236", [2, 2, 2, 2]),
};
/**
 * Validate a Central African Republic phone number.
 */
function validateCentralAfricanRepublic(input, options = {}) {
    return validateWithDefinition(input, CENTRAL_AFRICAN_REPUBLIC, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const EQUATORIAL_GUINEA = {
    info: {
        iso2: "GQ",
        dialCode: "240",
        name: "Equatorial Guinea",
    },
    nationalLength: 9,
    trunkPrefix: null,
    ranges: [
        // Mobile
        ...ranges("GETESA", "mobile", ["222"]),
        ...ranges("Muni", "mobile", ["55"]),
        // Fixed
        ...ranges("GETESA", "fixed", ["3"], /^(?:33[0-24-9]\d[46]\d{4}|3(?:33|5\d)\d[7-9]\d{4})$/),
    ],
    ...groupedFormats("240", [3, 3, 3]),
};
/**
 * Validate an Equatorial Guinea phone number.
 */
function validateEquatorialGuinea(input, options = {}) {
    return validateWithDefinition(input, EQUATORIAL_GUINEA, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const NIGERIA = {
    info: {
        iso2: "NG",
        dialCode: "234",
        name: "Nigeria",
    },
    nationalLength: 10,
    trunkPrefix: "0",
    ranges: [
        ...ranges("MTN", "mobile", [
            "703", "704", "706", "707", "7025", "7026",
            "803", "806", "810", "813", "814", "816",
            "903", "906", "910", "913", "916",
        ]),
        ...ranges("Airtel", "mobile", [
            "701", "708",
            "802", "808", "812",
            "901", "902", "904", "907", "911", "912",
        ]),
        ...ranges("Glo", "mobile", [
            "705",
            "805", "807", "811", "815",
            "905", "915",
        ]),
        ...ranges("9mobile", "mobile", [
            "809", "817", "818",
            "908", "909",
        ]),
        ...ranges("Ntel", "mobile", ["7021", "7022", "804"]),
        ...ranges("Smile", "mobile", ["7020"]),
        ...ranges("Prestel", "mobile", ["7024"]),
        ...ranges("Multilinks", "mobile", ["7027", "709"]),
        ...ranges("Starcomms", "mobile", ["7028", "7029", "8190", "8191"]),
        ...ranges("Lebara", "mobile", ["72"]),
        ...ranges("MAFAB", "mobile", ["801"]),
    ],
    ...groupedFormats("234", [3, 3, 4], "0"),
};
/**
 * Validate a Nigeria phone number.
 */
function validateNigeria(input, options = {}) {
    return validateWithDefinition(input, NIGERIA, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const BENIN = {
    info: {
        iso2: "BJ",
        dialCode: "229",
        name: "Benin",
    },
    nationalLength: 10,
    trunkPrefix: null,
    ranges: [
        // Mobile
        ...ranges("MTN", "mobile", [
            "0142", "0146",
            "015",
            "0161", "0162", "0166", "0167", "0169",
            "0190", "0191", "0196", "0197",
        ]),
        ...ranges("Moov", "mobile", [
            "0145",
            "0155", "0158",
            "0160", "0163", "0164", "0165", "0168",
            "0194", "0195", "0198", "0199",
        ]),
        // SBIN.
        ...ranges("Celtiis", "mobile", ["0128", "014", "0192", "0193"]),
        // Fixed
        ...ranges("Celtiis", "fixed", ["0120", "0121", "0122", "0123", "0124"]),
    ],
    ...groupedFormats("229", [2, 2, 2, 2, 2]),
};
/**
 * Validate a Benin phone number.
 */
function validateBenin(input, options = {}) {
    return validateWithDefinition(input, BENIN, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const TOGO = {
    info: {
        iso2: "TG",
        dialCode: "228",
        name: "Togo",
    },
    nationalLength: 8,
    trunkPrefix: null,
    ranges: [
        // Mobile
        // Formerly Togocom (Togo Cellulaire / Togo Telecom).
        ...ranges("Yas", "mobile", [
            "70", "71", "72", "73",
            "90", "91", "92", "93",
        ]),
        ...ranges("Moov Africa", "mobile", ["78", "79", "96", "97", "98", "99"]),
        // Fixed
        ...ranges("Yas", "fixed", [
            "222", "223", "224", "225", "226", "227",
            "232", "233",
            "244", "245",
            "255",
            "266", "267",
            "277",
        ]),
    ],
    ...groupedFormats("228", [2, 2, 2, 2]),
};
/**
 * Validate a Togo phone number.
 */
function validateTogo(input, options = {}) {
    return validateWithDefinition(input, TOGO, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const GHANA = {
    info: {
        iso2: "GH",
        dialCode: "233",
        name: "Ghana",
    },
    nationalLength: 9,
    trunkPrefix: "0",
    ranges: [
        ...ranges("MTN", "mobile", [
            "24", "256", "257",
            "53", "54", "55",
            "591", "592", "593", "594", "595", "596", "597", "598", "599",
        ]),
        // Formerly Vodafone Ghana.
        ...ranges("Telecel", "mobile", ["20", "50"]),
        // Formerly AirtelTigo.
        ...ranges("AT", "mobile", ["23", "26", "27", "56", "57"]),
    ],
    ...groupedFormats("233", [2, 3, 4], "0"),
};
/**
 * Validate a Ghana phone number.
 */
function validateGhana(input, options = {}) {
    return validateWithDefinition(input, GHANA, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const ZAMBIA = {
    info: {
        iso2: "ZM",
        dialCode: "260",
        name: "Zambia",
    },
    nationalLength: 9,
    trunkPrefix: "0",
    ranges: [
        // Mobile
        ...ranges("Airtel", "mobile", ["97", "77", "57"]),
        ...ranges("MTN", "mobile", ["96", "76", "56"]),
        ...ranges("Zamtel", "mobile", ["95", "75", "55"]),
        // 078 and 058 are reserved for Zedmobile but not active yet.
        ...ranges("Zedmobile", "mobile", ["98"]),
        // Fixed
        ...ranges("Zamtel", "fixed", [
            "211", "212", "213", "214", "215", "216", "217", "218",
        ]),
    ],
    ...groupedFormats("260", [2, 3, 4], "0"),
};
/**
 * Validate a Zambia phone number.
 */
function validateZambia(input, options = {}) {
    return validateWithDefinition(input, ZAMBIA, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const BURKINA_FASO = {
    info: {
        iso2: "BF",
        dialCode: "226",
        name: "Burkina Faso",
    },
    nationalLength: 8,
    trunkPrefix: null,
    ranges: [
        // Mobile
        ...ranges("Orange", "mobile", [
            "04", "05", "06", "07",
            "44", "45", "46",
            "54", "55", "56", "57",
            "64", "65", "66", "67",
            "74", "75", "76", "77",
        ]),
        // ONATEL.
        ...ranges("Moov Africa", "mobile", [
            "01", "02", "03",
            "50", "51", "52", "53",
            "60", "61", "62", "63",
            "70", "71", "72", "73",
        ]),
        ...ranges("Telecel Faso", "mobile", ["58", "68", "69", "78", "79"]),
        // Fixed
        ...ranges("Moov Africa", "fixed", ["2"], /^2(?:0(?:49|5[23]|6[5-7]|9[016-9])|4(?:4[569]|5[4-6]|6[5-7]|7[0179])|5(?:[34]\d|50|6[5-8]))\d{4}$/),
    ],
    ...groupedFormats("226", [2, 2, 2, 2]),
};
/**
 * Validate a Burkina Faso phone number.
 */
function validateBurkinaFaso(input, options = {}) {
    return validateWithDefinition(input, BURKINA_FASO, options);
}

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */
const COUNTRIES = {
    // Since 2.1.0
    CD: DRC,
    CG: CONGO,
    CM: CAMEROON,
    CI: IVORY_COAST,
    SN: SENEGAL,
    // Since 2.2.0
    AO: ANGOLA,
    GA: GABON,
    CF: CENTRAL_AFRICAN_REPUBLIC,
    GQ: EQUATORIAL_GUINEA,
    NG: NIGERIA,
    BJ: BENIN,
    TG: TOGO,
    GH: GHANA,
    ZM: ZAMBIA,
    BF: BURKINA_FASO,
};
/**
 * Countries grouped by the release that added them.
 *
 * Auto-detection of national numbers tries older groups
 * first, so adding a country never changes how a number
 * that ValiNum already recognized is interpreted.
 */
const DETECTION_TIERS = [
    ["CD", "CG", "CM", "CI", "SN"],
    ["AO", "GA", "CF", "GQ", "NG", "BJ", "TG", "GH", "ZM", "BF"],
];
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

/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
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
     * Only when a single country recognizes it. Older
     * tiers are tried first; an ambiguous tier stops the
     * search instead of guessing.
     */
    if (!options.strict) {
        for (const tier of DETECTION_TIERS) {
            const matches = others
                .filter((c) => tier.includes(c.info.iso2))
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

exports.formatE164 = formatE164;
exports.formatGroups = formatGroups;
exports.formatInternational = formatInternational;
exports.formatNational = formatNational;
exports.getSupportedCountries = getSupportedCountries;
exports.normalize = normalize;
exports.parse = parse;
exports.validate = validate;
exports.validateAngola = validateAngola;
exports.validateBasic = validateBasic;
exports.validateBenin = validateBenin;
exports.validateBurkinaFaso = validateBurkinaFaso;
exports.validateCameroon = validateCameroon;
exports.validateCentralAfricanRepublic = validateCentralAfricanRepublic;
exports.validateCongoBrazzaville = validateCongoBrazzaville;
exports.validateDRC = validateDRC;
exports.validateEquatorialGuinea = validateEquatorialGuinea;
exports.validateGabon = validateGabon;
exports.validateGhana = validateGhana;
exports.validateIvoryCoast = validateIvoryCoast;
exports.validateNigeria = validateNigeria;
exports.validateSenegal = validateSenegal;
exports.validateTogo = validateTogo;
exports.validateZambia = validateZambia;
//# sourceMappingURL=valinum.cjs.map
