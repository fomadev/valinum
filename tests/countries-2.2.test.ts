import { describe, expect, it } from "vitest";
import {
  validate,
  validateAngola,
  validateBenin,
  validateBurkinaFaso,
  validateCentralAfricanRepublic,
  validateEquatorialGuinea,
  validateGabon,
  validateGhana,
  validateNigeria,
  validateTogo,
  validateZambia,
} from "../src";

/*
 * ============================================================
 * ANGOLA (AO, +244)
 * ============================================================
 */

describe("Angola (+244)", () => {
  it.each([
    ["923123456", "Unitel"],
    ["941234567", "Unitel"],
    ["971234567", "Unitel"],
    ["911234567", "Movicel"],
    ["991234567", "Movicel"],
    ["951234567", "Africell"],
  ])("detects the operator of %s", (input, operator) => {
    const result = validateAngola(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe("mobile");
  });

  it("formats numbers in groups of three", () => {
    expect(validateAngola("+244923123456").number).toEqual({
      national: "923 123 456",
      international: "+244 923 123 456",
      e164: "+244923123456",
    });
  });

  it("rejects an unallocated prefix", () => {
    expect(validateAngola("981234567").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * GABON (GA, +241)
 * ============================================================
 */

describe("Gabon (+241)", () => {
  it.each([
    ["077 12 34 56", "Airtel", "mobile"],
    ["074123456", "Airtel", "mobile"],
    ["062123456", "Moov Africa", "mobile"],
    ["066123456", "Moov Africa", "mobile"],
    ["060312345", "Moov Africa", "mobile"],
    ["011446811", "Moov Africa", "fixed"],
  ])("detects the operator of %s", (input, operator, lineType) => {
    const result = validateGabon(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe(lineType);
  });

  it("drops the domestic 0 after +241", () => {
    expect(validateGabon("+241 77 12 34 56").number).toEqual({
      national: "077 12 34 56",
      international: "+241 77 12 34 56",
      e164: "+24177123456",
    });
  });

  it("rejects the domestic 0 after +241", () => {
    expect(validateGabon("+241077123456").error).toBe("INVALID_PREFIX");
  });

  it("rejects the pre-2019 7-digit format", () => {
    expect(validateGabon("07123456").error).toBe("TOO_SHORT");
  });
});

/*
 * ============================================================
 * CENTRAL AFRICAN REPUBLIC (CF, +236)
 * ============================================================
 */

describe("Central African Republic (+236)", () => {
  it.each([
    ["72123456", "Orange", "mobile"],
    ["74123456", "Orange", "mobile"],
    ["75123456", "Telecel", "mobile"],
    ["70123456", "Moov Africa", "mobile"],
    ["21612345", "Socatel", "fixed"],
  ])("detects the operator of %s", (input, operator, lineType) => {
    const result = validateCentralAfricanRepublic(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe(lineType);
  });

  it("formats numbers in pairs", () => {
    expect(
      validateCentralAfricanRepublic("+236 75 12 34 56").number?.international
    ).toBe("+236 75 12 34 56");
  });

  it("rejects an unallocated prefix", () => {
    expect(validateCentralAfricanRepublic("71123456").error).toBe(
      "INVALID_PREFIX"
    );
  });
});

/*
 * ============================================================
 * EQUATORIAL GUINEA (GQ, +240)
 * ============================================================
 */

describe("Equatorial Guinea (+240)", () => {
  it.each([
    ["222123456", "GETESA", "mobile"],
    ["551234567", "Muni", "mobile"],
    ["333091234", "GETESA", "fixed"],
    ["350181234", "GETESA", "fixed"],
  ])("detects the operator of %s", (input, operator, lineType) => {
    const result = validateEquatorialGuinea(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe(lineType);
  });

  it("checks the full fixed-line pattern", () => {
    // 33x with a fifth digit outside [46] is not allocated.
    expect(validateEquatorialGuinea("333001234").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * NIGERIA (NG, +234)
 * ============================================================
 */

describe("Nigeria (+234)", () => {
  it.each([
    ["08031234567", "MTN"],
    ["07061234567", "MTN"],
    ["09161234567", "MTN"],
    ["08021234567", "Airtel"],
    ["09121234567", "Airtel"],
    ["08051234567", "Glo"],
    ["09151234567", "Glo"],
    ["08091234567", "9mobile"],
    ["07020123456", "Smile"],
    ["08011234567", "MAFAB"],
  ])("detects the operator of %s", (input, operator) => {
    const result = validateNigeria(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe("mobile");
  });

  it("formats numbers the Nigerian way", () => {
    expect(validateNigeria("+234 803 123 4567").number).toEqual({
      national: "0803 123 4567",
      international: "+234 803 123 4567",
      e164: "+2348031234567",
    });
  });

  it("rejects unallocated prefixes", () => {
    expect(validateNigeria("07023123456").error).toBe("INVALID_PREFIX");
    expect(validateNigeria("08192123456").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * BENIN (BJ, +229)
 * ============================================================
 */

describe("Benin (+229)", () => {
  it.each([
    ["0197123456", "MTN", "mobile"],
    ["0161123456", "MTN", "mobile"],
    ["0150123456", "MTN", "mobile"],
    ["0195123456", "Moov", "mobile"],
    ["0155123456", "Moov", "mobile"],
    ["0140123456", "Celtiis", "mobile"],
    ["0142123456", "MTN", "mobile"],
    ["0121123456", "Celtiis", "fixed"],
  ])("detects the operator of %s", (input, operator, lineType) => {
    const result = validateBenin(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe(lineType);
  });

  it("formats numbers in pairs", () => {
    expect(validateBenin("+229 01 97 12 34 56").number?.national).toBe(
      "01 97 12 34 56"
    );
  });

  it("rejects the pre-2024 8-digit format", () => {
    expect(validateBenin("97123456").error).toBe("TOO_SHORT");
  });
});

/*
 * ============================================================
 * TOGO (TG, +228)
 * ============================================================
 */

describe("Togo (+228)", () => {
  it.each([
    ["90123456", "Yas", "mobile"],
    ["70123456", "Yas", "mobile"],
    ["99123456", "Moov Africa", "mobile"],
    ["79123456", "Moov Africa", "mobile"],
    ["22212345", "Yas", "fixed"],
  ])("detects the operator of %s", (input, operator, lineType) => {
    const result = validateTogo(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe(lineType);
  });

  it("rejects unallocated prefixes", () => {
    expect(validateTogo("94123456").error).toBe("INVALID_PREFIX");
    expect(validateTogo("22912345").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * GHANA (GH, +233)
 * ============================================================
 */

describe("Ghana (+233)", () => {
  it.each([
    ["0241234567", "MTN"],
    ["0551234567", "MTN"],
    ["0591234567", "MTN"],
    ["0201234567", "Telecel"],
    ["0501234567", "Telecel"],
    ["0271234567", "AT"],
    ["0571234567", "AT"],
  ])("detects the operator of %s", (input, operator) => {
    const result = validateGhana(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe("mobile");
  });

  it("formats numbers the Ghanaian way", () => {
    expect(validateGhana("+233 24 123 4567").number).toEqual({
      national: "024 123 4567",
      international: "+233 24 123 4567",
      e164: "+233241234567",
    });
  });

  it("rejects revoked and unallocated prefixes", () => {
    // 028: Expresso, licence revoked in 2018.
    expect(validateGhana("0281234567").error).toBe("INVALID_PREFIX");
    expect(validateGhana("0590123456").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * ZAMBIA (ZM, +260)
 * ============================================================
 */

describe("Zambia (+260)", () => {
  it.each([
    ["0971234567", "Airtel", "mobile"],
    ["0771234567", "Airtel", "mobile"],
    ["0961234567", "MTN", "mobile"],
    ["0951234567", "Zamtel", "mobile"],
    ["0981234567", "Zedmobile", "mobile"],
    ["0211123456", "Zamtel", "fixed"],
  ])("detects the operator of %s", (input, operator, lineType) => {
    const result = validateZambia(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe(lineType);
  });

  it("formats numbers the Zambian way", () => {
    expect(validateZambia("+260971234567").number?.national).toBe(
      "097 123 4567"
    );
  });

  it("rejects ranges that are not active yet", () => {
    expect(validateZambia("0781234567").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * BURKINA FASO (BF, +226)
 * ============================================================
 */

describe("Burkina Faso (+226)", () => {
  it.each([
    ["70123456", "Moov Africa", "mobile"],
    ["01123456", "Moov Africa", "mobile"],
    ["76123456", "Orange", "mobile"],
    ["05123456", "Orange", "mobile"],
    ["78123456", "Telecel Faso", "mobile"],
    ["25301234", "Moov Africa", "fixed"],
  ])("detects the operator of %s", (input, operator, lineType) => {
    const result = validateBurkinaFaso(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe(lineType);
  });

  it("checks the full fixed-line pattern", () => {
    expect(validateBurkinaFaso("20001234").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * AUTOMATIC DETECTION WITH 15 COUNTRIES
 * ============================================================
 */

describe("Automatic detection of the 2.2.0 countries", () => {
  it.each([
    ["+244 923 123 456", "AO"],
    ["+241 77 12 34 56", "GA"],
    ["+236 75 12 34 56", "CF"],
    ["+240 222 123 456", "GQ"],
    ["+234 803 123 4567", "NG"],
    ["+229 01 97 12 34 56", "BJ"],
    ["+228 90 12 34 56", "TG"],
    ["+233 24 123 4567", "GH"],
    ["+260 97 123 4567", "ZM"],
    ["+226 76 12 34 56", "BF"],
  ])("reads the country from the code of %s", (input, iso2) => {
    const result = validate(input);

    expect(result.valid).toBe(true);
    expect(result.country?.iso2).toBe(iso2);
  });

  it.each([
    ["2348031234567", "NG"],
    ["233241234567", "GH"],
    ["2290197123456", "BJ"],
  ])("detects a country code written without + in %s", (input, iso2) => {
    expect(validate(input).country?.iso2).toBe(iso2);
  });

  it.each([
    ["0803 123 4567", "NG"],
    ["024 123 4567", "GH"],
    ["90 12 34 56", "TG"],
  ])("recognizes the national number %s", (input, iso2) => {
    const result = validate(input);

    expect(result.valid).toBe(true);
    expect(result.country?.iso2).toBe(iso2);
  });

  it("keeps numbers recognized by 2.1.0 unchanged", () => {
    // Also valid in Zambia, but Côte d'Ivoire was supported first.
    expect(validate("0771234567").country?.iso2).toBe("CI");
    // Also valid in Gabon, but Congo-Brazzaville was supported first.
    expect(validate("062123456").country?.iso2).toBe("CG");
    // Every Benin number (01...) is also a Moov Côte d'Ivoire number.
    expect(validate("01 97 12 34 56").country?.iso2).toBe("CI");
    expect(
      validate("01 97 12 34 56", { defaultCountry: "BJ" }).country?.iso2
    ).toBe("BJ");
  });

  it("does not guess between new countries", () => {
    // 70 12 34 56 is valid in Togo, Burkina Faso and CAR.
    expect(validate("70123456").valid).toBe(false);
    expect(validate("70123456", { defaultCountry: "BF" }).country?.iso2).toBe(
      "BF"
    );
  });
});
