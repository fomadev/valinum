import { describe, expect, it } from "vitest";
import { validate } from "../src";

describe("ValiNum v2.0.0 - Democratic Republic of the Congo", () => {
  /*
   * ============================================================
   * VALID NUMBERS
   * ============================================================
   */

  describe("Valid numbers", () => {
    it("accepts a standard national number", () => {
      const result = validate("0824708027");

      expect(result.valid).toBe(true);
      expect(result.country?.iso2).toBe("CD");
      expect(result.country?.dialCode).toBe("243");
    });

    it("accepts +243 international format", () => {
      const result = validate("+243824708027");

      expect(result.valid).toBe(true);
      expect(result.country?.dialCode).toBe("243");
    });

    it("accepts international format without +", () => {
      const result = validate("243824708027");

      expect(result.valid).toBe(true);
      expect(result.country?.dialCode).toBe("243");
    });

    it("accepts 00 as an international prefix", () => {
      const result = validate("00243824708027");

      expect(result.valid).toBe(true);
      expect(result.country?.dialCode).toBe("243");
    });

    it("treats +243 and 00243 as equivalent", () => {
      const plus = validate("+243824708027");
      const doubleZero = validate("00243824708027");

      expect(plus.valid).toBe(true);
      expect(doubleZero.valid).toBe(true);

      expect(plus.number?.e164).toBe(
        doubleZero.number?.e164
      );
    });
  });

  /*
   * ============================================================
   * INPUT FORMATTING
   * ============================================================
   */

  describe("Input formatting", () => {
    it("accepts spaces", () => {
      const result = validate("082 470 80 27");

      expect(result.valid).toBe(true);
    });

    it("accepts hyphens", () => {
      const result = validate("082-470-80-27");

      expect(result.valid).toBe(true);
    });

    it("accepts dots", () => {
      const result = validate("082.470.80.27");

      expect(result.valid).toBe(true);
    });

    it("accepts parentheses", () => {
      const result = validate("(082) 470 80 27");

      expect(result.valid).toBe(true);
    });

    it("accepts formatted international numbers", () => {
      const result = validate("+243 824 708 027");

      expect(result.valid).toBe(true);
    });

    it("accepts formatted 00 international numbers", () => {
      const result = validate("00243 824 708 027");

      expect(result.valid).toBe(true);
    });
  });

  /*
   * ============================================================
   * OPERATOR DETECTION
   * ============================================================
   */

  describe("Operator detection", () => {
    it("detects Vodacom 81", () => {
      const result = validate("0812345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Vodacom");
      expect(result.operator?.prefix).toBe("81");
    });

    it("detects Vodacom 82", () => {
      const result = validate("0824708027");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Vodacom");
      expect(result.operator?.prefix).toBe("82");
    });

    it("detects Vodacom 83", () => {
      const result = validate("0832345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Vodacom");
      expect(result.operator?.prefix).toBe("83");
    });

    it("detects Vodacom 86", () => {
      const result = validate("0862345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Vodacom");
      expect(result.operator?.prefix).toBe("86");
    });

    it("detects Orange 80", () => {
      const result = validate("0802345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Orange");
      expect(result.operator?.prefix).toBe("80");
    });

    it("detects Orange 84", () => {
      const result = validate("0842345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Orange");
      expect(result.operator?.prefix).toBe("84");
    });

    it("detects Orange 85", () => {
      const result = validate("0852345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Orange");
      expect(result.operator?.prefix).toBe("85");
    });

    it("detects Orange 89", () => {
      const result = validate("0892345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Orange");
      expect(result.operator?.prefix).toBe("89");
    });

    it("detects Airtel 97", () => {
      const result = validate("0972345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Airtel");
      expect(result.operator?.prefix).toBe("97");
    });

    it("detects Airtel 98", () => {
      const result = validate("0982345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Airtel");
      expect(result.operator?.prefix).toBe("98");
    });

    it("detects Airtel 99", () => {
      const result = validate("0992345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Airtel");
      expect(result.operator?.prefix).toBe("99");
    });

    it("detects Africell 90", () => {
      const result = validate("0902345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Africell");
      expect(result.operator?.prefix).toBe("90");
    });

    it("detects Africell 91", () => {
      const result = validate("0912345678");

      expect(result.valid).toBe(true);
      expect(result.operator?.name).toBe("Africell");
      expect(result.operator?.prefix).toBe("91");
    });
  });

  /*
   * ============================================================
   * LENGTH VALIDATION
   * ============================================================
   */

  describe("Length validation", () => {
    it("rejects a number that is too short", () => {
      const result = validate("082470802");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("TOO_SHORT");
    });

    it("rejects a number that is too long", () => {
      const result = validate("08247080270");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("TOO_LONG");
    });
  });

  /*
   * ============================================================
   * INVALID PREFIXES
   * ============================================================
   */

  describe("Invalid prefixes", () => {
    it("rejects an unknown operator prefix", () => {
      const result = validate("0872345678");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("INVALID_PREFIX");
    });

    it("rejects another unknown prefix", () => {
      const result = validate("0922345678");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("INVALID_PREFIX");
    });
  });

  /*
   * ============================================================
   * INVALID INTERNATIONAL FORMATS
   * ============================================================
   */

  describe("Invalid international formats", () => {
    it("rejects a zero after +243", () => {
      const result = validate("+2430824708027");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("INVALID_PREFIX");
    });

    it("rejects a zero after 243", () => {
      const result = validate("2430824708027");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("INVALID_PREFIX");
    });
  });

  /*
   * ============================================================
   * EMPTY INPUT
   * ============================================================
   */

  describe("Empty input", () => {
    it("rejects an empty string", () => {
      const result = validate("");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("EMPTY_INPUT");
    });

    it("rejects whitespace-only input", () => {
      const result = validate("   ");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("EMPTY_INPUT");
    });
  });

  /*
   * ============================================================
   * RESULT FORMATTING
   * ============================================================
   */

  describe("Result formatting", () => {
    it("returns the expected E.164 number", () => {
      const result = validate("0824708027");

      expect(result.valid).toBe(true);
      expect(result.number?.e164).toBe(
        "+243824708027"
      );
    });

    it("returns the expected international number", () => {
      const result = validate("0824708027");

      expect(result.valid).toBe(true);
      expect(result.number?.international).toBe(
        "+243 824 708 027"
      );
    });

    it("returns the expected national number", () => {
      const result = validate("0824708027");

      expect(result.valid).toBe(true);
      expect(result.number?.national).toBe(
        "082 470 8027"
      );
    });
  });

  /*
   * ============================================================
   * EQUIVALENT INPUTS
   * ============================================================
   */

  describe("Equivalent representations", () => {
    it("produces the same E.164 output for equivalent formats", () => {
      const inputs = [
        "0824708027",
        "+243824708027",
        "243824708027",
        "00243824708027",
        "082 470 80 27",
        "082-470-80-27",
        "(082) 470 80 27",
        "+243 824 708 027",
        "00243 824 708 027",
      ];

      for (const input of inputs) {
        const result = validate(input);

        expect(result.valid).toBe(true);
        expect(result.number?.e164).toBe(
          "+243824708027"
        );
      }
    });
  });

  /*
   * ============================================================
   * STRICT MODE
   * ============================================================
   */

  describe("Strict mode", () => {
    it("accepts an international number", () => {
      const result = validate(
        "+243824708027",
        { strict: true }
      );

      expect(result.valid).toBe(true);
    });

    it("accepts 243 international format", () => {
      const result = validate(
        "243824708027",
        { strict: true }
      );

      expect(result.valid).toBe(true);
    });

    it("rejects a national number in strict mode", () => {
      const result = validate(
        "0824708027",
        { strict: true }
      );

      expect(result.valid).toBe(false);
      expect(result.error).toBe(
        "INVALID_COUNTRY_CODE"
      );
    });

    it("accepts 00 international format in strict mode", () => {
      const result = validate(
        "00243824708027",
        { strict: true }
      );

      expect(result.valid).toBe(true);
    });
  });

  /*
   * ============================================================
   * 00 PREFIX OPTION
   * ============================================================
   */

  describe("00 international prefix option", () => {
    it("accepts 00 by default", () => {
      const result = validate("00243824708027");

      expect(result.valid).toBe(true);
    });

    it("can disable 00 prefix support", () => {
      const result = validate(
        "00243824708027",
        { accept00Prefix: false }
      );

      expect(result.valid).toBe(false);
    });
  });
});