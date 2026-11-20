import { describe, expect, it } from "vitest";
import {
  validate,
  validateBotswana,
  validateBurundi,
  validateKenya,
  validateMalawi,
  validateMozambique,
  validateNamibia,
  validateRwanda,
  validateSouthSudan,
  validateTanzania,
  validateUganda,
  validateZimbabwe,
} from "../src";

/*
 * ============================================================
 * BOTSWANA (BW, +267)
 * ============================================================
 */

describe("Botswana (+267)", () => {
  it.each([
    ["71123456", "Mascom"],
    ["74512345", "Mascom"],
    ["78912345", "Mascom"],
    ["72123456", "Orange"],
    ["74312345", "Orange"],
    ["78123456", "Orange"],
    ["73123456", "BTC"],
    ["77212345", "BTC"],
  ])("detects the operator of %s", (input, operator) => {
    const result = validateBotswana(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe("mobile");
  });

  it("formats numbers without a trunk prefix", () => {
    expect(validateBotswana("+267 71 123 456").number).toEqual({
      national: "71 123 456",
      international: "+267 71 123 456",
      e164: "+26771123456",
    });
  });

  it("rejects fixed lines and unallocated prefixes", () => {
    expect(validateBotswana("3951234").error).toBe("TOO_SHORT");
    expect(validateBotswana("79112345").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * ZIMBABWE (ZW, +263)
 * ============================================================
 */

describe("Zimbabwe (+263)", () => {
  it.each([
    ["0712345678", "NetOne"],
    ["0731234567", "Telecel"],
    ["0771234567", "Econet"],
    ["0781234567", "Econet"],
  ])("detects the operator of %s", (input, operator) => {
    const result = validateZimbabwe(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
  });

  it("drops the domestic 0 after +263", () => {
    expect(validateZimbabwe("+263 77 123 4567").number).toEqual({
      national: "077 123 4567",
      international: "+263 77 123 4567",
      e164: "+263771234567",
    });
    expect(validateZimbabwe("+2630771234567").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * MOZAMBIQUE (MZ, +258)
 * ============================================================
 */

describe("Mozambique (+258)", () => {
  it.each([
    ["821234567", "Tmcel"],
    ["831234567", "Tmcel"],
    ["841234567", "Vodacom"],
    ["851234567", "Vodacom"],
    ["861234567", "Movitel"],
    ["871234567", "Movitel"],
  ])("detects the operator of %s", (input, operator) => {
    const result = validateMozambique(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
  });

  it("formats numbers", () => {
    expect(validateMozambique("00258 84 123 4567").number).toEqual({
      national: "84 123 4567",
      international: "+258 84 123 4567",
      e164: "+258841234567",
    });
  });
});

/*
 * ============================================================
 * SOUTH SUDAN (SS, +211)
 * ============================================================
 */

describe("South Sudan (+211)", () => {
  it.each([
    ["0911234567", "Zain"],
    ["0921234567", "MTN"],
    ["0981234567", "Digitel"],
  ])("detects the operator of %s", (input, operator) => {
    expect(validateSouthSudan(input).operator?.name).toBe(operator);
  });

  it("formats numbers", () => {
    expect(validateSouthSudan("+211921234567").number).toEqual({
      national: "0921 234 567",
      international: "+211 921 234 567",
      e164: "+211921234567",
    });
  });

  it("rejects closed networks", () => {
    expect(validateSouthSudan("0951234567").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * KENYA (KE, +254)
 * ============================================================
 */

describe("Kenya (+254)", () => {
  it.each([
    ["0712345678", "Safaricom"],
    ["0110123456", "Safaricom"],
    ["0757123456", "Safaricom"],
    ["0733123456", "Airtel"],
    ["0750123456", "Airtel"],
    ["0100123456", "Airtel"],
    ["0771123456", "Telkom"],
    ["0761123456", "Telkom"],
    ["0747123456", "JTL"],
  ])("detects the operator of %s", (input, operator) => {
    const result = validateKenya(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
  });

  it("formats numbers", () => {
    expect(validateKenya("+254 712 345 678").number).toEqual({
      national: "0712 345 678",
      international: "+254 712 345 678",
      e164: "+254712345678",
    });
  });
});

/*
 * ============================================================
 * UGANDA (UG, +256)
 * ============================================================
 */

describe("Uganda (+256)", () => {
  it.each([
    ["0772123456", "MTN"],
    ["0761123456", "MTN"],
    ["0701123456", "Airtel"],
    ["0752123456", "Airtel"],
    ["0711123456", "UTL"],
    ["0726123456", "Lycamobile"],
  ])("detects the operator of %s", (input, operator) => {
    expect(validateUganda(input).operator?.name).toBe(operator);
  });

  it("formats numbers", () => {
    expect(validateUganda("+256772123456").number).toEqual({
      national: "0772 123 456",
      international: "+256 772 123 456",
      e164: "+256772123456",
    });
  });

  it("rejects closed networks", () => {
    expect(validateUganda("0798123456").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * RWANDA (RW, +250)
 * ============================================================
 */

describe("Rwanda (+250)", () => {
  it.each([
    ["0781234567", "MTN"],
    ["0791234567", "MTN"],
    ["0721234567", "Airtel"],
    ["0731234567", "Airtel"],
  ])("detects the operator of %s", (input, operator) => {
    expect(validateRwanda(input).operator?.name).toBe(operator);
  });

  it("formats numbers", () => {
    expect(validateRwanda("+250 78 123 4567").number).toEqual({
      national: "0781 234 567",
      international: "+250 781 234 567",
      e164: "+250781234567",
    });
  });
});

/*
 * ============================================================
 * BURUNDI (BI, +257)
 * ============================================================
 */

describe("Burundi (+257)", () => {
  it.each([
    ["79123456", "Leo", "mobile"],
    ["71123456", "Leo", "mobile"],
    ["68123456", "Lumitel", "mobile"],
    ["61123456", "Lumitel", "mobile"],
    ["77123456", "Onatel", "mobile"],
    ["22201234", "Onatel", "fixed"],
  ])("detects the operator of %s", (input, operator, lineType) => {
    const result = validateBurundi(input);

    expect(result.valid).toBe(true);
    expect(result.operator?.name).toBe(operator);
    expect(result.lineType).toBe(lineType);
  });

  it("formats numbers in pairs", () => {
    expect(validateBurundi("+257 79 12 34 56").number).toEqual({
      national: "79 12 34 56",
      international: "+257 79 12 34 56",
      e164: "+25779123456",
    });
  });

  it("rejects closed networks", () => {
    expect(validateBurundi("75123456").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * TANZANIA (TZ, +255)
 * ============================================================
 */

describe("Tanzania (+255)", () => {
  it.each([
    ["0754123456", "Vodacom"],
    ["0784123456", "Airtel"],
    ["0684123456", "Airtel"],
    ["0714123456", "Yas"],
    ["0655123456", "Yas"],
    ["0621123456", "Halotel"],
    ["0734123456", "TTCL"],
  ])("detects the operator of %s", (input, operator) => {
    expect(validateTanzania(input).operator?.name).toBe(operator);
  });

  it("formats numbers", () => {
    expect(validateTanzania("+255754123456").number).toEqual({
      national: "0754 123 456",
      international: "+255 754 123 456",
      e164: "+255754123456",
    });
  });

  it("rejects unallocated prefixes", () => {
    expect(validateTanzania("0641234567").error).toBe("INVALID_PREFIX");
  });
});

/*
 * ============================================================
 * MALAWI (MW, +265)
 * ============================================================
 */

describe("Malawi (+265)", () => {
  it.each([
    ["0991234567", "Airtel"],
    ["0981234567", "Airtel"],
    ["0881234567", "TNM"],
    ["0891234567", "TNM"],
  ])("detects the operator of %s", (input, operator) => {
    expect(validateMalawi(input).operator?.name).toBe(operator);
  });

  it("formats numbers", () => {
    expect(validateMalawi("+265 991 23 45 67").number).toEqual({
      national: "0991 23 45 67",
      international: "+265 991 23 45 67",
      e164: "+265991234567",
    });
  });
});

/*
 * ============================================================
 * NAMIBIA (NA, +264)
 * ============================================================
 */

describe("Namibia (+264)", () => {
  it.each([
    ["0811234567", "MTC"],
    ["0851234567", "TN Mobile"],
    ["0601234567", "Telecom Namibia"],
  ])("detects the operator of %s", (input, operator) => {
    expect(validateNamibia(input).operator?.name).toBe(operator);
  });

  it("formats numbers", () => {
    expect(validateNamibia("+264811234567").number).toEqual({
      national: "081 123 4567",
      international: "+264 81 123 4567",
      e164: "+264811234567",
    });
  });
});

/*
 * ============================================================
 * AUTOMATIC DETECTION
 * ============================================================
 */

describe("Automatic detection of the 2.3.0 countries", () => {
  it.each([
    ["+267 71 123 456", "BW"],
    ["+263 77 123 4567", "ZW"],
    ["+258 84 123 4567", "MZ"],
    ["+211 92 123 4567", "SS"],
    ["+254 712 345 678", "KE"],
    ["+256 772 123 456", "UG"],
    ["+250 78 123 4567", "RW"],
    ["+257 79 12 34 56", "BI"],
    ["+255 754 123 456", "TZ"],
    ["+265 991 23 45 67", "MW"],
    ["+264 81 123 4567", "NA"],
  ])("reads the country from the code of %s", (input, iso2) => {
    const result = validate(input);

    expect(result.valid).toBe(true);
    expect(result.country?.iso2).toBe(iso2);
  });

  it("detects a country code written without +", () => {
    expect(validate("254712345678").country?.iso2).toBe("KE");
  });

  it("keeps numbers recognized by older releases in their country", () => {
    // Also valid in Zimbabwe, Uganda, Kenya, Rwanda and Tanzania.
    expect(validate("0771234567").country?.iso2).toBe("CI");
  });

  it("detects an unambiguous national number", () => {
    expect(validate("0881234567").country?.iso2).toBe("MW");
  });

  it("respects defaultCountry", () => {
    expect(
      validate("0712345678", { defaultCountry: "KE" }).country?.iso2
    ).toBe("KE");
  });
});
