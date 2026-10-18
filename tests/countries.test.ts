import { describe, expect, it } from "vitest";
import {
  validate,
  validateCameroon,
  validateCongoBrazzaville,
  validateIvoryCoast,
  validateSenegal,
  getSupportedCountries,
} from "../src";

/*
 * ============================================================
 * REPUBLIC OF THE CONGO (CG, +242)
 * ============================================================
 */

describe("Republic of the Congo (+242)", () => {
  it("accepts a national MTN number", () => {
    const result = validateCongoBrazzaville("06 123 4567");

    expect(result.valid).toBe(true);
    expect(result.country?.iso2).toBe("CG");
    expect(result.operator?.name).toBe("MTN");
    expect(result.lineType).toBe("mobile");
  });

  it.each([
    ["061234567", "MTN"],
    ["051234567", "Airtel"],
    ["041234567", "Airtel"],
    ["011234567", "Equateur Telecom"],
    ["024012345", "Congo Telecom"],
    ["026101234", "Congo Telecom"],
  ])("detects the operator of %s", (input, operator) => {
    const result = validateCongoBrazzaville(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
  });

  it("accepts a Congo Telecom fixed line", () => {
    const result = validateCongoBrazzaville("222812345");

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe("Congo Telecom");
    expect(result.lineType).toBe("fixed");
  });

  it("keeps the leading 0 after +242", () => {
    const result = validateCongoBrazzaville("+242 06 123 4567");

    expect(result.valid).toBe(true);
    expect(result.number).toEqual({
      national: "06 123 4567",
      international: "+242 06 123 4567",
      e164: "+242061234567",
    });
  });

  it("rejects a number without the leading 0", () => {
    const result = validateCongoBrazzaville("+24261234567");

    expect(result.valid).toBe(false);
    expect(result.error).toBe("TOO_SHORT");
  });

  it("rejects an unallocated prefix", () => {
    const result = validateCongoBrazzaville("071234567");

    expect(result.valid).toBe(false);
    expect(result.error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * CAMEROON (CM, +237)
 * ============================================================
 */

describe("Cameroon (+237)", () => {
  it.each([
    ["671234567", "MTN", "67"],
    ["650123456", "MTN", "650"],
    ["681234567", "MTN", "681"],
    ["655123456", "Orange", "655"],
    ["691234567", "Orange", "69"],
    ["640123456", "Orange", "640"],
    ["687123456", "Orange", "687"],
    ["661234567", "Nexttel", "66"],
    ["684123456", "Nexttel", "684"],
    ["621234567", "Camtel", "62"],
    ["242123456", "Camtel", "242"],
  ])("detects the operator of %s", (input, operator, prefix) => {
    const result = validateCameroon(input);

    expect(result.valid).toBe(true);
    expect(result.operator).toEqual({ name: operator, prefix });
    expect(result.lineType).toBe("mobile");
  });

  it("accepts Camtel fixed lines", () => {
    for (const input of ["222123456", "233123456"]) {
      const result = validateCameroon(input);

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Camtel");
      expect(result.lineType).toBe("fixed");
    }
  });

  it("formats numbers the Cameroonian way", () => {
    const result = validateCameroon("00237 671 23 45 67");

    expect(result.number).toEqual({
      national: "6 71 23 45 67",
      international: "+237 6 71 23 45 67",
      e164: "+237671234567",
    });
  });

  it("rejects the old 8-digit format", () => {
    const result = validateCameroon("71234567");

    expect(result.valid).toBe(false);
    expect(result.error).toBe("TOO_SHORT");
  });

  it("rejects unallocated ranges", () => {
    expect(validateCameroon("631234567").error).toBe("INVALID_PREFIX");
    expect(validateCameroon("643123456").error).toBe("INVALID_PREFIX");
    expect(validateCameroon("711234567").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * COTE D'IVOIRE (CI, +225)
 * ============================================================
 */

describe("Côte d'Ivoire (+225)", () => {
  it.each([
    ["0102030405", "Moov"],
    ["0505030405", "MTN"],
    ["0707123456", "Orange"],
  ])("detects the mobile operator of %s", (input, operator) => {
    const result = validateIvoryCoast(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe("mobile");
  });

  it.each([
    ["2120304050", "Moov"],
    ["2520304050", "MTN"],
    ["2722412345", "Orange"],
  ])("detects the fixed operator of %s", (input, operator) => {
    const result = validateIvoryCoast(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe("fixed");
  });

  it("formats numbers in pairs", () => {
    const result = validateIvoryCoast("+225 07 07 12 34 56");

    expect(result.number).toEqual({
      national: "07 07 12 34 56",
      international: "+225 07 07 12 34 56",
      e164: "+2250707123456",
    });
  });

  it("rejects the pre-2021 8-digit format", () => {
    const result = validateIvoryCoast("07123456");

    expect(result.valid).toBe(false);
    expect(result.error).toBe("TOO_SHORT");
  });

  it("rejects unallocated prefixes", () => {
    expect(validateIvoryCoast("0307123456").error).toBe("INVALID_PREFIX");
    expect(validateIvoryCoast("2799123456").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * SENEGAL (SN, +221)
 * ============================================================
 */

describe("Senegal (+221)", () => {
  it.each([
    ["771234567", "Orange"],
    ["781234567", "Orange"],
    ["711234567", "Orange"],
    ["761234567", "Yas"],
    ["701234567", "Expresso"],
    ["751234567", "Promobile"],
    ["721234567", "Hayo"],
    ["790123456", "ADIE"],
  ])("detects the operator of %s", (input, operator) => {
    const result = validateSenegal(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe("mobile");
  });

  it("accepts Orange fixed lines", () => {
    const result = validateSenegal("338 21 23 45");

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe("Orange");
    expect(result.lineType).toBe("fixed");
  });

  it("formats numbers the Senegalese way", () => {
    const result = validateSenegal("+221771234567");

    expect(result.number).toEqual({
      national: "77 123 45 67",
      international: "+221 77 123 45 67",
      e164: "+221771234567",
    });
  });

  it("rejects unallocated prefixes", () => {
    expect(validateSenegal("731234567").error).toBe("INVALID_PREFIX");
    expect(validateSenegal("722234567").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * AUTOMATIC COUNTRY DETECTION
 * ============================================================
 */

describe("Automatic country detection", () => {
  it("lists every supported country", () => {
    expect(getSupportedCountries().map((c) => c.iso2)).toEqual([
      "CD", "CG", "CM", "CI", "SN",
    ]);
  });

  it.each([
    ["+243824708027", "CD"],
    ["+242061234567", "CG"],
    ["00237671234567", "CM"],
    ["+225 07 07 12 34 56", "CI"],
    ["+221 77 123 45 67", "SN"],
  ])("reads the country from the code of %s", (input, iso2) => {
    const result = validate(input);

    expect(result.valid).toBe(true);
    expect(result.country?.iso2).toBe(iso2);
  });

  it.each([
    ["242061234567", "CG"],
    ["237671234567", "CM"],
    ["2250707123456", "CI"],
    ["221771234567", "SN"],
  ])("detects a country code written without + in %s", (input, iso2) => {
    const result = validate(input);

    expect(result.valid).toBe(true);
    expect(result.country?.iso2).toBe(iso2);
  });

  it.each([
    ["0824708027", "CD"],
    ["06 123 4567", "CG"],
    ["671 23 45 67", "CM"],
    ["07 07 12 34 56", "CI"],
    ["77 123 45 67", "SN"],
  ])("recognizes the national number %s", (input, iso2) => {
    const result = validate(input);

    expect(result.valid).toBe(true);
    expect(result.country?.iso2).toBe(iso2);
  });

  it("does not guess between ambiguous countries", () => {
    // 222 1xx xxx is a fixed line in both Cameroon and Congo.
    const result = validate("222123456");

    expect(result.valid).toBe(false);
    expect(result.country?.iso2).toBe("CD");
  });

  it("uses defaultCountry to resolve ambiguity", () => {
    expect(validate("222123456", { defaultCountry: "CM" }).country?.iso2).toBe("CM");
    expect(validate("222123456", { defaultCountry: "CG" }).country?.iso2).toBe("CG");
  });

  it("rejects an unsupported country code", () => {
    const result = validate("+33612345678");

    expect(result.valid).toBe(false);
    expect(result.country).toBeNull();
    expect(result.error).toBe("INVALID_COUNTRY_CODE");
  });

  it("forces a single country with the country option", () => {
    const result = validate("+221771234567", { country: "CM" });

    expect(result.valid).toBe(false);
    expect(result.error).toBe("INVALID_COUNTRY_CODE");
    expect(validate("771234567", { country: "SN" }).valid).toBe(true);
  });

  it("limits detection with the countries option", () => {
    expect(validate("771234567", { countries: ["CD", "CM"] }).valid).toBe(false);
    expect(validate("+221771234567", { countries: ["CD", "CM"] }).error).toBe(
      "INVALID_COUNTRY_CODE"
    );
  });

  it("rejects national numbers in strict mode", () => {
    const result = validate("771234567", { strict: true });

    expect(result.valid).toBe(false);
    expect(result.error).toBe("INVALID_COUNTRY_CODE");
    expect(validate("+221771234567", { strict: true }).valid).toBe(true);
    expect(validate("221771234567", { strict: true }).valid).toBe(true);
  });

  it("throws on an unsupported country option", () => {
    expect(() => validate("0824708027", { country: "FR" as never })).toThrow(
      RangeError
    );
  });
});
