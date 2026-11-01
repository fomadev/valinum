# The ValiNum Course

**Version 2.2.0** · From zero to expert, one chapter at a time.

This document is a complete course. You can read it from top to bottom like a book: every chapter builds on the previous one, and no prior knowledge of phone numbers or of ValiNum is needed. If you already know the basics, use the table of contents to jump straight to what you need.

## Table of contents

- [Chapter 0. Introduction](#chapter-0-introduction)
- [Chapter 1. Phone numbers explained](#chapter-1-phone-numbers-explained)
- [Chapter 2. What ValiNum does for you](#chapter-2-what-valinum-does-for-you)
- [Chapter 3. Installing ValiNum](#chapter-3-installing-valinum)
- [Chapter 4. Your first validation](#chapter-4-your-first-validation)
- [Chapter 5. Understanding the result](#chapter-5-understanding-the-result)
- [Chapter 6. What users can type](#chapter-6-what-users-can-type)
- [Chapter 7. Errors and how to explain them](#chapter-7-errors-and-how-to-explain-them)
- [Chapter 8. Automatic country detection](#chapter-8-automatic-country-detection)
- [Chapter 9. Options](#chapter-9-options)
- [Chapter 10. One validator per country](#chapter-10-one-validator-per-country)
- [Chapter 11. The 15 supported countries](#chapter-11-the-15-supported-countries)
- [Chapter 12. Practical recipes](#chapter-12-practical-recipes)
- [Chapter 13. The building blocks (advanced)](#chapter-13-the-building-blocks-advanced)
- [Chapter 14. How ValiNum works inside](#chapter-14-how-valinum-works-inside)
- [Chapter 15. TypeScript reference](#chapter-15-typescript-reference)
- [Chapter 16. Frequently asked questions](#chapter-16-frequently-asked-questions)
- [Chapter 17. Contributing and versions](#chapter-17-contributing-and-versions)
- [Chapter 18. Summary and cheat sheet](#chapter-18-summary-and-cheat-sheet)
- [Appendix. Glossary](#appendix-glossary)

---

## Chapter 0. Introduction

### What is ValiNum?

ValiNum is a small JavaScript library that **checks and understands phone numbers** from 15 African countries.

You give it what a person typed in a form, for example `082 470 80 27`. ValiNum tells you:

- whether the number is **valid**;
- which **country** it belongs to (here: Democratic Republic of the Congo);
- which **operator** it belongs to (here: Vodacom);
- whether it is a **mobile** or a **fixed** line;
- how to **write it properly** in three standard formats.

You don't write any of these rules yourself. You don't need to know that `82` means Vodacom, or that Senegal numbers have 9 digits: ValiNum knows.

### Who is this course for?

Everyone:

- **Complete beginners** who have never used a JavaScript library. Chapters 0 to 7 explain everything step by step.
- **Developers** who want to integrate ValiNum into a website, an app or a server. Chapters 8 to 12 are for you.
- **Advanced users and contributors** who want to know how ValiNum works inside or add a country. Chapters 13 to 17 go into the details.

### How to read this course

- Code examples are written in JavaScript. They also work in TypeScript.
- A line like `// "Vodacom"` after some code shows what that code returns.
- Every example in this course was run against the real library, so what you read is what you get.

### What you will be able to do at the end

- Explain what a country code, a national number and an operator prefix are.
- Install ValiNum and validate a number in less than a minute.
- Read every field of a validation result and show clear error messages to your users.
- Choose the right options for your situation (one country, several countries, the whole continent).
- Build a phone field that validates as the user types, and store numbers correctly in a database.
- Understand the code of ValiNum well enough to contribute to it.

---

## Chapter 1. Phone numbers explained

Before using ValiNum, you need a few words of vocabulary. This chapter takes about five minutes and makes the rest of the course easy.

### 1.1 Anatomy of a phone number

Let's take one number from the Democratic Republic of the Congo, written in its international form:

```txt
+243 82 470 8027
 │    │  └──────── subscriber number: identifies one SIM card
 │    └─────────── operator prefix: 82 = Vodacom
 └──────────────── country code: 243 = DR Congo
```

- The **country code** (also called *dial code*) identifies the country. Every country has one: `243` for DR Congo, `237` for Cameroon, `221` for Senegal…
- The **national number** is everything after the country code: `824708027`. Its length is fixed by each country (9 digits in DR Congo).
- The **operator prefix** is the beginning of the national number. It tells which company the number was given to: `82` is Vodacom, `84` is Orange, and so on.

### 1.2 Calling from abroad: `+` and `00`

To call a number from another country, you write the country code first. There are two equivalent ways to say "a country code follows":

- the `+` sign: `+243 824 708 027`;
- the international prefix `00`: `00243 824 708 027`.

Both mean exactly the same thing.

### 1.3 Calling inside the country: the trunk prefix

Inside some countries, people add a `0` in front of the national number when they don't type the country code:

```txt
International:  +243  824 708 027
National:          0  824 708 027   ← this 0 is the "trunk prefix"
```

This `0` is called the **trunk prefix**. It is **never** written after the country code: `+243 0824 708 027` is wrong.

Not every country has a trunk prefix. In Senegal, Cameroon or Côte d'Ivoire, the national number is written as it is: `77 123 45 67` in Senegal is the same as `+221 77 123 45 67`. Careful: in Congo-Brazzaville and Côte d'Ivoire, the leading `0` you see (`06 123 4567`, `07 07 12 34 56`) is **part of the number itself**, not a trunk prefix, so it stays after the country code: `+242 06 123 4567`.

You don't need to remember which country does what: ValiNum handles it. You only need to understand that these differences exist.

### 1.4 Mobile and fixed lines

- A **mobile** number belongs to a SIM card (a phone you carry).
- A **fixed** number (landline) belongs to a phone installed in a building.

Each country reserves different prefixes for each kind. ValiNum tells you which one a number is.

### 1.5 The E.164 format

**E.164** is the international standard for writing a phone number with no spaces and no ambiguity:

```txt
+243824708027
```

It is a `+`, the country code and the national number, nothing else. Every number in the world has exactly **one** E.164 form, which makes it perfect for storing numbers in a database (see Chapter 12).

### 1.6 What you should remember

| Term | Example | Meaning |
| --- | --- | --- |
| Country code | `243` | Identifies the country |
| National number | `824708027` | The number inside the country |
| Operator prefix | `82` | Identifies the operator (Vodacom) |
| Trunk prefix | `0` in `0824708027` | Added in some countries for national calls |
| International prefix | `00` or `+` | Announces a country code |
| E.164 | `+243824708027` | The standard, unique way to write a number |

---

## Chapter 2. What ValiNum does for you

### 2.1 The problem

Imagine a registration form with a "Phone number" field. Ten users type the same number in ten different ways:

```txt
0824708027
082 470 80 27
082-470-80-27
(082) 470 80 27
824708027
+243824708027
+243 824 708 027
00243824708027
00243 824 708 027
243824708027
```

All of them are correct, and all of them are **the same number**. Without a library, you would have to write a lot of fragile code to clean, check and compare them, and you would have to do it again for every country.

### 2.2 The solution

With ValiNum, one function call handles all ten cases:

```js
validate("082-470-80-27").number.e164; // "+243824708027"
validate("00243 824 708 027").number.e164; // "+243824708027"
```

Every form gives the same answer. Your code stays short and the rules stay up to date inside ValiNum.

### 2.3 What ValiNum checks

- The number contains only digits (after removing spaces and separators).
- The country code is one of the 15 supported countries.
- The length is right for that country.
- The prefix is really allocated to an operator in that country.

### 2.4 What ValiNum does **not** do

It is important to know the limits of any tool:

- **It does not call the number.** A valid number has the right shape and an allocated prefix, but nobody can tell, without calling or sending a code by SMS, whether the SIM card is active. To verify that a number belongs to your user, send them a code.
- **It cannot see number portability.** In some countries you can keep your number when you change operators. The prefix then shows the *original* operator, not necessarily the current one.
- **It only knows 15 countries.** Numbers from other countries (France `+33`, USA `+1`…) are reported as unsupported.

---

## Chapter 3. Installing ValiNum

There are two ways to use ValiNum. Pick the one that matches your project.

### 3.1 With npm (Node.js, React, Vue, Angular, Vite, Next.js…)

If your project has a `package.json` file, install ValiNum with npm:

```bash
npm install valinum
```

Then import it in your code. Both module styles work:

```js
// Modern JavaScript (ES modules)
import { validate } from "valinum";
```

```js
// CommonJS (older Node.js code)
const { validate } = require("valinum");
```

TypeScript types are included: there is nothing else to install. They work with every `moduleResolution` setting (`node`, `node16`, `nodenext`, `bundler`).

### 3.2 Without installing anything (CDN)

For a simple HTML page, load ValiNum from a CDN, a public server that hosts the library files for you. Add this line to your page:

```html
<script src="https://cdn.jsdelivr.net/npm/valinum@2.2.0/dist/valinum.min.js"></script>
```

This creates a global object called `ValiNum`. You use it like this:

```html
<script>
  const result = ValiNum.validate("0824708027");
  console.log(result.valid); // true
</script>
```

If you prefer modern ES modules in the browser:

```html
<script type="module">
  import { validate } from "https://cdn.jsdelivr.net/npm/valinum@2.2.0/dist/valinum.mjs";

  console.log(validate("77 123 45 67").country.name); // "Senegal"
</script>
```

The files are also served straight from the GitHub repository:

```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.2.0/dist/valinum.min.js"></script>
```

### 3.3 Which file should I use?

The `dist/` folder contains the ready-to-use files:

| File | Format | When to use it |
| --- | --- | --- |
| `valinum.min.js` | UMD, minified | `<script>` tag in a web page (smallest file) |
| `valinum.js` | UMD, readable | Same, when you want to read or debug the code |
| `valinum.mjs` | ES module | `import` in modern browsers, Deno, bundlers |
| `valinum.cjs` | CommonJS | `require()` in Node.js |

With npm you never choose: the right file is picked automatically.

> **Tip:** in production, always write an exact version in CDN links (`@2.2.0`). A link without a version, or pointing to a branch such as `@main`, can change at any moment.

---

## Chapter 4. Your first validation

Let's write a real program, step by step.

### 4.1 Create a small project

Open a terminal and type:

```bash
mkdir my-first-valinum
cd my-first-valinum
npm init -y
npm install valinum
```

### 4.2 Write the program

Create a file named `index.mjs` (the `.mjs` extension lets you use `import`) with this content:

```js
import { validate } from "valinum";

const result = validate("082 470 80 27");

console.log("Valid?", result.valid);
console.log("Country:", result.country.name);
console.log("Operator:", result.operator.name);
console.log("Line:", result.lineType);
console.log("E.164:", result.number.e164);
```

### 4.3 Run it

```bash
node index.mjs
```

You will see:

```txt
Valid? true
Country: Democratic Republic of the Congo
Operator: Vodacom
Line: mobile
E.164: +243824708027
```

Congratulations: you have validated your first phone number! In five lines, ValiNum cleaned the input, found the country and the operator, and produced the standard format.

### 4.4 Try other numbers

Replace the number with these and run the program again:

```js
validate("+237 671 23 45 67"); // Cameroon, MTN
validate("07 07 12 34 56"); // Côte d'Ivoire, Orange
validate("77 123 45 67"); // Senegal, Orange
```

Then try an invalid one:

```js
validate("082470802");
```

The program crashes with an error like `Cannot read properties of null`. Why? Because the number is invalid, so `result.country`, `result.operator` and `result.number` don't contain what our program expects. The next chapter explains how to read a result safely.

---

## Chapter 5. Understanding the result

Every call to `validate()` returns an object with the same six fields.

### 5.1 A valid result

```js
validate("0824708027");
```

returns:

```js
{
  valid: true,
  country: {
    iso2: "CD",
    dialCode: "243",
    name: "Democratic Republic of the Congo"
  },
  operator: {
    name: "Vodacom",
    prefix: "82"
  },
  number: {
    national: "082 470 8027",
    international: "+243 824 708 027",
    e164: "+243824708027"
  },
  lineType: "mobile",
  error: null
}
```

### 5.2 Each field explained

| Field | Type | Meaning |
| --- | --- | --- |
| `valid` | `true` / `false` | **The most important field.** `true` only if the number is fully valid. |
| `country` | object or `null` | The country: `iso2` (2-letter code), `dialCode` (country code), `name` |
| `operator` | object or `null` | The operator: `name` and the `prefix` that identified it |
| `number` | object or `null` | The number in three formats (see 5.3) |
| `lineType` | `"mobile"`, `"fixed"` or `null` | The kind of line |
| `error` | text or `null` | `null` when valid, otherwise an error code (Chapter 7) |

### 5.3 The three formats

| Format | Example | Use it for |
| --- | --- | --- |
| `number.national` | `082 470 8027` | Showing the number to people **in** the country |
| `number.international` | `+243 824 708 027` | Showing the number to people **outside** the country |
| `number.e164` | `+243824708027` | **Storing** the number, sending SMS, calling APIs |

Each country is formatted the way its people write it: `6 71 23 45 67` in Cameroon, `07 07 12 34 56` in Côte d'Ivoire, `77 123 45 67` in Senegal.

### 5.4 An invalid result

```js
validate("082470802");
```

returns:

```js
{
  valid: false,
  country: { iso2: "CD", dialCode: "243", name: "Democratic Republic of the Congo" },
  operator: null,
  number: null,
  lineType: null,
  error: "TOO_SHORT"
}
```

### 5.5 The golden rule: check `valid` first

When a number is invalid, `country` only tells you **which country ValiNum tried**, not that the number belongs to it. In some cases `number` is even partly filled, to help you show what was understood. Never trust these fields when `valid` is `false`.

So always start with `valid`:

```js
const result = validate(userInput);

if (result.valid) {
  console.log("Operator:", result.operator.name);
  console.log("Save:", result.number.e164);
} else {
  console.log("Invalid number, reason:", result.error);
}
```

Our program from Chapter 4 now works with any input.

> **Tip:** the `?.` operator (optional chaining) reads a field without crashing when the object is `null`: `result.operator?.name` gives `undefined` instead of an error.

---

## Chapter 6. What users can type

ValiNum is tolerant: it accepts the many ways people write numbers.

### 6.1 Accepted forms

```js
validate("0824708027"); // national, with the trunk prefix 0
validate("824708027"); // national, without the 0 (DR Congo)
validate("+243824708027"); // international with +
validate("00243824708027"); // international with 00
validate("243824708027"); // country code without + or 00
```

All five are valid and give the same `e164`: `+243824708027`.

### 6.2 Accepted separators

Spaces, hyphens, dots and parentheses are simply removed, in any combination:

```js
validate("082 470 80 27");
validate("082-470-80-27");
validate("082.470.80.27");
validate("(082) 470 80 27");
validate("082 470-80.27");
validate("  +243 824 708 027  "); // spaces around are ignored too
```

### 6.3 Rejected input

Anything else that is not a digit makes the number invalid with the `INVALID_CHARACTERS` error:

```js
validate("082/470/8027").error; // "INVALID_CHARACTERS" (slashes)
validate("08247080a7").error; // "INVALID_CHARACTERS" (a letter)
validate("abc").error; // "INVALID_CHARACTERS"
```

An empty field, or a field with only spaces, gives `EMPTY_INPUT`.

> **Note:** ValiNum expects text. Calling `validate(824708027)` with a number instead of a string throws a `TypeError`. Values from HTML inputs are always strings, so this only happens if you convert them yourself.

---

## Chapter 7. Errors and how to explain them

When `valid` is `false`, the `error` field tells you why.

### 7.1 Every error code

| Code | When | Example |
| --- | --- | --- |
| `EMPTY_INPUT` | Nothing was typed | `""`, `"   "` |
| `INVALID_CHARACTERS` | A character other than digits and separators | `"082/470/8027"` |
| `INVALID_COUNTRY_CODE` | The country code is not supported, or not allowed by your options | `"+33612345678"` |
| `TOO_SHORT` | Not enough digits for the country | `"082470802"` |
| `TOO_LONG` | Too many digits for the country | `"08247080270"` |
| `INVALID_PREFIX` | Right length, but the prefix is not allocated to any operator, or a trunk `0` was written after the country code | `"0872345678"`, `"+2430824708027"` |
| `INVALID_LENGTH` | Reserved for future use; never returned by the current version | — |

### 7.2 Showing friendly messages

Error codes are for your program; your users need sentences. Translate each code once:

```js
const MESSAGES = {
  EMPTY_INPUT: "Please enter a phone number.",
  INVALID_CHARACTERS: "Use digits only (spaces, dots and dashes are fine).",
  INVALID_COUNTRY_CODE: "This country is not supported.",
  TOO_SHORT: "This number is too short.",
  TOO_LONG: "This number is too long.",
  INVALID_PREFIX: "This number does not exist for any operator.",
};

function phoneMessage(input) {
  const result = validate(input);
  return result.valid ? "" : MESSAGES[result.error];
}

phoneMessage("082470802"); // "This number is too short."
```

The same in French, for French-speaking users:

```js
const MESSAGES_FR = {
  EMPTY_INPUT: "Veuillez saisir un numéro de téléphone.",
  INVALID_CHARACTERS: "Utilisez uniquement des chiffres (espaces, points et tirets acceptés).",
  INVALID_COUNTRY_CODE: "Ce pays n'est pas pris en charge.",
  TOO_SHORT: "Ce numéro est trop court.",
  TOO_LONG: "Ce numéro est trop long.",
  INVALID_PREFIX: "Ce numéro n'existe chez aucun opérateur.",
};
```

### 7.3 Errors that are thrown

Two programming mistakes are reported by throwing an exception instead of returning a result, so you notice them during development:

- a value that is not a string → `TypeError: Phone number must be a string`;
- an unknown country in the options, for example `{ country: "FR" }` → `RangeError: Unsupported country: FR`.

---

## Chapter 8. Automatic country detection

This is ValiNum's smartest feature: you don't have to say which country a number comes from.

### 8.1 How ValiNum finds the country

`validate()` follows four steps, in this order:

1. **A country code is written** (`+237…` or `00237…`): the country is read from it.
   `validate("+237 671 23 45 67")` → Cameroon.
2. **The default country** (DR Congo unless you change it) is tried with the number as typed.
   `validate("0824708027")` → DR Congo.
3. **A country code without `+`**: if the digits start with a supported country code **and** have exactly the right length for that country, that country is used.
   `validate("237671234567")` → Cameroon.
4. **A national number of another country**: ValiNum tries the other countries. If **exactly one** country accepts the number, that country wins.
   `validate("77 123 45 67")` → Senegal.

```js
validate("+242 06 123 4567").country.iso2; // "CG"
validate("237671234567").country.iso2; // "CM"
validate("07 07 12 34 56").country.iso2; // "CI"
validate("77 123 45 67").country.iso2; // "SN"
```

### 8.2 When a number fits several countries

Some national numbers are valid in more than one country. For example `222 123 456` is a fixed line in Cameroon **and** in Congo-Brazzaville, and `70 12 34 56` is valid in Togo, Burkina Faso **and** the Central African Republic.

In that case ValiNum **never guesses**, because a wrong guess is worse than no answer. The number is reported invalid (with the default country's error) until you give a hint:

```js
validate("70123456").valid; // false: three countries match
validate("70123456", { defaultCountry: "BF" }).country.iso2; // "BF"
validate("+226 70 12 34 56").country.iso2; // "BF"
```

### 8.3 Older countries keep their numbers

ValiNum added countries over time: five in version 2.1.0, ten more in 2.2.0. To make sure an update never changes the meaning of a number your app already accepted, step 4 tries the **older countries first**:

- `077 123 4567` stays a Côte d'Ivoire number, even though it is also a valid Zambian number.
- `062 123 456` stays a Congo-Brazzaville number, even though it is also valid in Gabon.
- Every Benin number (`01 …`) is also a valid Moov Côte d'Ivoire number. So for Benin, use `defaultCountry: "BJ"` or the `+229` prefix.

### 8.4 Choosing the right strategy

With 15 countries, many national numbers look alike. Choose based on where your users are:

| Your users are… | Do this |
| --- | --- |
| In **one** country | Set `defaultCountry`, or `country` to accept only that country |
| In **a few** countries | Set `countries` to that list |
| **Anywhere** in Africa | Ask users to type the international format (`+…`), or add a country selector |

Options are explained in detail in the next chapter.

---

## Chapter 9. Options

`validate()` accepts a second argument: an object of options. All options are optional.

```js
validate(input, {
  defaultCountry: "SN",
  strict: false,
});
```

### 9.1 `defaultCountry`: the country tried first

The country used first for numbers typed **without** a country code. Default: `"CD"` (DR Congo).

```js
validate("222123456").valid; // false (ambiguous between CM and CG)
validate("222123456", { defaultCountry: "CM" }).country.name; // "Cameroon"
```

Numbers from other countries are still detected (steps 1, 3 and 4 of Chapter 8).

### 9.2 `country`: one country only

Validate against **one** country and nothing else. Automatic detection is turned off, and a number from another country is rejected with `INVALID_COUNTRY_CODE`:

```js
validate("77 123 45 67", { country: "SN" }).valid; // true
validate("+237671234567", { country: "SN" }).error; // "INVALID_COUNTRY_CODE"
```

### 9.3 `countries`: a list of allowed countries

Restrict detection to some countries:

```js
validate("+221771234567", { countries: ["CD", "CG"] }).error; // "INVALID_COUNTRY_CODE"
validate("06 123 4567", { countries: ["CD", "CG"] }).country.iso2; // "CG"
```

When you use `countries`, also set `defaultCountry` to one of them, or the first country of the list is used.

### 9.4 `strict`: international format required

In strict mode, only numbers written with a country code are accepted (`+243…`, `00243…` or `243…`):

```js
validate("0824708027", { strict: true }).error; // "INVALID_COUNTRY_CODE"
validate("+243824708027", { strict: true }).valid; // true
validate("243824708027", { strict: true }).valid; // true
```

Use it when you need numbers that are unambiguous on their own, for example in an international contact list.

### 9.5 `accept00Prefix`: understanding `00`

By default, `00` at the beginning is understood as an international prefix, like `+`. Set it to `false` to turn that off:

```js
validate("00243824708027").valid; // true
validate("00243824708027", { accept00Prefix: false }).valid; // false
```

You will rarely need it; keep the default unless your users type numbers that really start with `00` for another reason.

### 9.6 Summary

| Option | Type | Default | Effect |
| --- | --- | --- | --- |
| `defaultCountry` | country code | `"CD"` | Country tried first for national numbers |
| `country` | country code | none | Accept only this country |
| `countries` | list of codes | all 15 | Countries allowed for detection |
| `strict` | `true` / `false` | `false` | Require a country code |
| `accept00Prefix` | `true` / `false` | `true` | Treat `00` like `+` |

Country codes are the two-letter codes of Chapter 11: `"CD"`, `"CG"`, `"CM"`, `"CI"`, `"SN"`, `"AO"`, `"GA"`, `"CF"`, `"GQ"`, `"NG"`, `"BJ"`, `"TG"`, `"GH"`, `"ZM"`, `"BF"`.

---

## Chapter 10. One validator per country

Besides `validate()`, ValiNum offers one function per country. Each one checks the number against that country only:

| Function | Country |
| --- | --- |
| `validateAngola` | Angola |
| `validateBenin` | Benin |
| `validateBurkinaFaso` | Burkina Faso |
| `validateCameroon` | Cameroon |
| `validateCentralAfricanRepublic` | Central African Republic |
| `validateIvoryCoast` | Côte d'Ivoire |
| `validateDRC` | Democratic Republic of the Congo |
| `validateEquatorialGuinea` | Equatorial Guinea |
| `validateGabon` | Gabon |
| `validateGhana` | Ghana |
| `validateNigeria` | Nigeria |
| `validateCongoBrazzaville` | Republic of the Congo |
| `validateSenegal` | Senegal |
| `validateTogo` | Togo |
| `validateZambia` | Zambia |

```js
import { validateSenegal } from "valinum";

validateSenegal("77 123 45 67").valid; // true
validateSenegal("+237671234567").error; // "INVALID_COUNTRY_CODE"
```

`validateSenegal(input)` gives the same result as `validate(input, { country: "SN" })`. These functions accept the `strict` and `accept00Prefix` options.

### Listing the countries

`getSupportedCountries()` returns the list of all supported countries, useful for building a country selector:

```js
import { getSupportedCountries } from "valinum";

getSupportedCountries()[0];
// { iso2: "CD", dialCode: "243", name: "Democratic Republic of the Congo" }

getSupportedCountries().length; // 15
```

---

## Chapter 11. The 15 supported countries

This chapter is a reference: for each country, the number format and every operator prefix ValiNum recognizes. Prefixes are the first digits of the **national** number. A dash means a range: `650`–`654` is `650`, `651`, `652`, `653` and `654`.

### Angola (`AO`, `+244`)

9 digits, no trunk prefix (`923 123 456`). Mobile only.

- Unitel: `92`, `93`, `94`, `97`
- Movicel: `91`, `99`
- Africell: `95`, `96`

### Benin (`BJ`, `+229`)

10 digits since 2024, every number starts with `01` (`01 97 12 34 56`).

- MTN: `0142`, `0146`, `015`, `0161`, `0162`, `0166`, `0167`, `0169`, `0190`, `0191`, `0196`, `0197`
- Moov: `0145`, `0155`, `0158`, `0160`, `0163`–`0165`, `0168`, `0194`, `0195`, `0198`, `0199`
- Celtiis (SBIN): mobile `0128`, `014`, `0192`, `0193`; fixed `0120`–`0124`

### Burkina Faso (`BF`, `+226`)

8 digits, no trunk prefix (`70 12 34 56`).

- Orange: `04`–`07`, `44`–`46`, `54`–`57`, `64`–`67`, `74`–`77`
- Moov Africa (ONATEL): mobile `01`–`03`, `50`–`53`, `60`–`63`, `70`–`73`; fixed `20`, `24` and `25` blocks
- Telecel Faso: `58`, `68`, `69`, `78`, `79`

### Cameroon (`CM`, `+237`)

9 digits, no trunk prefix (`6 71 23 45 67`).

- MTN: `650`–`654`, `67`, `680`–`683`
- Orange: `640`–`642`, `655`–`659`, `686`–`689`, `69`
- Nexttel: `66`, `684`, `685`
- Camtel: mobile `62`, `242`, `243`; fixed `222`, `233`

### Central African Republic (`CF`, `+236`)

8 digits, no trunk prefix (`75 12 34 56`).

- Orange: `72`, `73`, `74`
- Telecel: `75`, `76`
- Moov Africa: `70`
- Socatel: fixed `21`, `22`

### Côte d'Ivoire (`CI`, `+225`)

10 digits since 2021, no trunk prefix (`07 07 12 34 56`).

- Orange: mobile `07`, fixed `27`
- MTN: mobile `05`, fixed `25`
- Moov: mobile `01`, fixed `21`

### Democratic Republic of the Congo (`CD`, `+243`)

9 digits, trunk prefix `0` (`082 470 8027`).

- Vodacom: `81`, `82`, `83`, `86`
- Orange: `80`, `84`, `85`, `89`
- Africell: `90`, `91`
- Airtel: `97`, `98`, `99`

### Equatorial Guinea (`GQ`, `+240`)

9 digits, no trunk prefix (`222 123 456`).

- GETESA: mobile `222`; fixed `33x` and `35x` blocks
- Muni: `55`

### Gabon (`GA`, `+241`)

8 digits since 2019, dialled with a leading `0` inside the country (`077 12 34 56` / `+241 77 12 34 56`).

- Airtel: `74`, `76`, `77`
- Moov Africa (Gabon Telecom): mobile `600`–`604`, `610`, `62`, `65`, `66`; fixed `11`

### Ghana (`GH`, `+233`)

9 digits, trunk prefix `0` (`024 123 4567`). Mobile only.

- MTN: `24`, `256`, `257`, `53`, `54`, `55`, `591`–`599`
- Telecel (formerly Vodafone): `20`, `50`
- AT (formerly AirtelTigo): `23`, `26`, `27`, `56`, `57`

### Nigeria (`NG`, `+234`)

10 digits, trunk prefix `0` (`0803 123 4567`). Mobile only.

- MTN: `703`, `704`, `706`, `707`, `7025`, `7026`, `803`, `806`, `810`, `813`, `814`, `816`, `903`, `906`, `910`, `913`, `916`
- Airtel: `701`, `708`, `802`, `808`, `812`, `901`, `902`, `904`, `907`, `911`, `912`
- Glo: `705`, `805`, `807`, `811`, `815`, `905`, `915`
- 9mobile: `809`, `817`, `818`, `908`, `909`
- Ntel: `7021`, `7022`, `804` · Smile: `7020` · Prestel: `7024` · Multilinks: `7027`, `709` · Starcomms: `7028`, `7029`, `8190`, `8191` · Lebara: `72` · MAFAB: `801`

### Republic of the Congo (`CG`, `+242`)

9 digits, no trunk prefix: the leading `0` belongs to the number (`06 123 4567` / `+242 06 123 4567`).

- MTN: `06`
- Airtel: `05`, `04` (former Warid range)
- Equateur Telecom: `01`
- Congo Telecom: mobile `0240`, `0255`–`0258`, `0260`, `02610`–`02615`, `02666`–`02669`, `0267`–`0269`; fixed `2221`–`2225`, `2228`, `2229`

### Senegal (`SN`, `+221`)

9 digits, no trunk prefix (`77 123 45 67`).

- Orange: mobile `71`, `77`, `78`; fixed `338`, `339`
- Yas (formerly Free): mobile `76`, fixed `32`
- Expresso: mobile `70`, fixed `30`
- Promobile: `75`
- Hayo: mobile `721`, fixed `36`
- ADIE: `790`

### Togo (`TG`, `+228`)

8 digits, no trunk prefix (`90 12 34 56`).

- Yas (formerly Togocom): mobile `70`–`73`, `90`–`93`; fixed `222`–`227`, `232`, `233`, `244`, `245`, `255`, `266`, `267`, `277`
- Moov Africa: `78`, `79`, `96`–`99`

### Zambia (`ZM`, `+260`)

9 digits, trunk prefix `0` (`097 123 4567`).

- Airtel: `97`, `77`, `57`
- MTN: `96`, `76`, `56`
- Zamtel: mobile `95`, `75`, `55`; fixed `211`–`218`
- Zedmobile: `98`

### Where does this data come from?

Number ranges come from Google's libphonenumber numbering data, cross-checked with national regulators and recent news for operator names (rebrandings such as Togocom → Yas or Vodafone Ghana → Telecel). Ranges that are not in service (licence revoked, reserved, operator closed) are left out on purpose.

---

## Chapter 12. Practical recipes

Ready-to-use solutions for the most common situations.

### 12.1 Validate a form field as the user types

A complete HTML page you can copy, save as `index.html` and open in a browser:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Phone field</title>
  <script src="https://cdn.jsdelivr.net/npm/valinum@2.2.0/dist/valinum.min.js"></script>
</head>
<body>
  <label for="phone">Phone number</label>
  <input id="phone" type="tel" autocomplete="tel">
  <p id="info"></p>

  <script>
    const MESSAGES = {
      EMPTY_INPUT: "Please enter a phone number.",
      INVALID_CHARACTERS: "Use digits only.",
      INVALID_COUNTRY_CODE: "This country is not supported.",
      TOO_SHORT: "This number is too short.",
      TOO_LONG: "This number is too long.",
      INVALID_PREFIX: "This number does not exist for any operator.",
    };

    const input = document.getElementById("phone");
    const info = document.getElementById("info");

    input.addEventListener("input", () => {
      const result = ValiNum.validate(input.value);

      if (result.valid) {
        info.textContent =
          "✓ " + result.number.international +
          " · " + result.operator.name +
          " (" + result.country.name + ")";
        input.style.borderColor = "green";
      } else {
        info.textContent = MESSAGES[result.error];
        input.style.borderColor = "red";
      }
    });
  </script>
</body>
</html>
```

> **Tip:** showing an error while the user is still typing can feel aggressive. A common pattern is to show errors only when the field loses focus (the `blur` event), and to show the success message as soon as the number is valid.

### 12.2 Store numbers in a database

**Store `number.e164`.** It is unique (all ways of typing a number give the same E.164), it is what SMS and payment services expect, and you can always get the display formats back by validating it again.

```js
function savePhone(user, input) {
  const result = validate(input);

  if (!result.valid) {
    throw new Error("Invalid phone number: " + result.error);
  }

  user.phone = result.number.e164; // "+243824708027"
  user.phoneOperator = result.operator.name; // "Vodacom"
  user.phoneLineType = result.lineType; // "mobile"
}
```

Later, to display it:

```js
validate(user.phone).number.national; // "082 470 8027"
```

### 12.3 Check numbers on the server

Never trust the browser alone: a user can bypass JavaScript. Validate again on your server (Node.js):

```js
import { validate } from "valinum";

export function checkPhone(input) {
  if (typeof input !== "string") {
    return { ok: false, error: "EMPTY_INPUT" };
  }

  const result = validate(input, { countries: ["CD", "CG"], defaultCountry: "CD" });

  return result.valid
    ? { ok: true, phone: result.number.e164 }
    : { ok: false, error: result.error };
}
```

The `typeof` check protects you from the `TypeError` of Chapter 7 when the request contains something other than text.

### 12.4 Build a country selector

```js
import { getSupportedCountries, validate } from "valinum";

const select = document.getElementById("country");

for (const country of getSupportedCountries()) {
  select.add(new Option(country.name + " (+" + country.dialCode + ")", country.iso2));
}

function validateWithSelectedCountry(input) {
  return validate(input, { country: select.value });
}
```

With a selector, every national number becomes unambiguous.

### 12.5 Accept only mobile numbers

To send SMS, you need a mobile number:

```js
function isMobile(input) {
  const result = validate(input);
  return result.valid && result.lineType === "mobile";
}

isMobile("0824708027"); // true
isMobile("+221 338 21 23 45"); // false (Senegal fixed line)
```

### 12.6 Clean an existing list of numbers

```js
const rawNumbers = ["082 470 80 27", "+237 671 23 45 67", "12345"];

const cleaned = [];
const rejected = [];

for (const raw of rawNumbers) {
  const result = validate(raw);

  if (result.valid) {
    cleaned.push(result.number.e164);
  } else {
    rejected.push({ raw, reason: result.error });
  }
}

// cleaned:  ["+243824708027", "+237671234567"]
// rejected: [{ raw: "12345", reason: "TOO_SHORT" }]
```

### 12.7 Old numbers that are now too short

Some countries lengthened their numbers. ValiNum follows the current plans, so old numbers are rejected with `TOO_SHORT`:

| Country | Old | Current | Since |
| --- | --- | --- | --- |
| Benin | 8 digits | 10 digits (`01` + old number) | November 2024 |
| Cameroon | 8 digits | 9 digits (`6` mobile / `2` fixed + old number) | November 2014 |
| Côte d'Ivoire | 8 digits | 10 digits (2-digit operator code + old number) | January 2021 |
| Gabon | 7 digits | 8 digits | November 2019 |

If your database contains old numbers, ask users to update them; don't try to convert them automatically, because the right new prefix depends on the operator.

---

## Chapter 13. The building blocks (advanced)

`validate()` is built from smaller functions that ValiNum also exports. Most people never need them, but they are useful for special cases.

### 13.1 `normalize(input, accept00Prefix = true)`

Cleans the syntax: trims the input, removes spaces, hyphens, dots and parentheses, and turns a leading `00` into `+`. It does **not** check anything else.

```js
normalize("00243 824-708.027");
// { value: "+243824708027", international: true }
```

### 13.2 `parse(normalized, dialCode)`

Splits a normalized number into the country code and the national number, for a given country code.

```js
parse("+243824708027", "243");
// { international: true, countryCode: "243", nationalNumber: "824708027" }
```

### 13.3 `validateBasic(nationalNumber, expectedLength)`

Checks that a national number contains only digits and has the expected length.

```js
validateBasic("82470802", 9);
// { valid: false, error: "TOO_SHORT" }
```

### 13.4 Formatters

```js
formatE164("243", "824708027"); // "+243824708027"
formatGroups("771234567", [2, 3, 2, 2]); // "77 123 45 67"
formatInternational("243", "824708027"); // "+243 824 708 027"
formatNational("824708027"); // "082 470 8027"
```

`formatE164` and `formatGroups` work for any country. `formatInternational` and `formatNational` use the DR Congo layout (groups of 3, and a `0` in front); they are kept for compatibility. For other countries, use `result.number`, which is already formatted the right way.

---

## Chapter 14. How ValiNum works inside

This chapter explains the code, for curious readers and future contributors.

### 14.1 The validation pipeline

Every country goes through the same steps, in `src/core/engine.ts`:

```txt
"00243 824-708.027"
        │
   1. normalize        → "+243824708027"
        │
   2. strict check     → (only with the strict option)
        │
   3. parse            → country code "243", national "824708027"
        │
   4. trunk prefix     → remove the national 0; reject it after the country code
        │
   5. length           → 9 digits expected for DR Congo ✓
        │
   6. operator range   → "82" → Vodacom, mobile ✓
        │
   7. formatting       → national, international, E.164
```

If a step fails, the pipeline stops and returns the matching error code.

### 14.2 A country is just a description

Each file in `src/countries/` **describes** a numbering plan; it contains no validation logic. Here is Senegal, slightly shortened:

```ts
export const SENEGAL: CountryDefinition = {
  info: { iso2: "SN", dialCode: "221", name: "Senegal" },

  nationalLength: 9, // national numbers have 9 digits
  trunkPrefix: null, // no national 0

  ranges: [
    ...ranges("Orange", "mobile", ["71", "77", "78"]),
    ...ranges("Yas", "mobile", ["76"]),
    ...ranges("Orange", "fixed", ["338", "339"]),
  ],

  formatNational: (national) => formatGroups(national, [2, 3, 2, 2]),
  formatInternational: (national) => `+221 ${formatGroups(national, [2, 3, 2, 2])}`,
};
```

The engine reads this description and applies the pipeline. Adding a country therefore means writing a description, not new logic.

### 14.3 Finding the operator: the longest prefix wins

Ranges can overlap. In Cameroon, `65` is split between MTN (`650`–`654`) and Orange (`655`–`659`). ValiNum picks the **most specific** (longest) prefix that matches the number:

```txt
655123456 → candidates: none for "65", Orange for "655" → Orange
```

For complex fixed-line plans (Equatorial Guinea, Burkina Faso), a range can also carry a full **pattern** (a regular expression) that the whole number must match.

### 14.4 Detection across countries

`src/validate.ts` implements the four detection steps of Chapter 8 on top of the engine. Countries are grouped by the release that added them (`DETECTION_TIERS` in `src/countries/index.ts`); step 4 tries the older group first, and stops without guessing as soon as a group has more than one match.

### 14.5 Project structure

```txt
src/
├── core/
│   ├── engine.ts       the validation pipeline (Chapter 14.1)
│   ├── normalize.ts    cleaning (Chapter 13.1)
│   ├── parser.ts       splitting country code / national number
│   ├── validator.ts    digits and length checks
│   └── formatter.ts    output formats
├── countries/
│   ├── index.ts        list of countries and detection tiers
│   └── *.ts            one numbering plan per country (15 files)
├── validate.ts         automatic country detection
├── types.ts            TypeScript types (Chapter 15)
└── index.ts            everything the library exports
tests/                  automated tests (Vitest)
dist/                   built files (Chapter 3.3)
```

---

## Chapter 15. TypeScript reference

ValiNum is written in TypeScript and ships its types. Every type below can be imported:

```ts
import type { ValidationResult, ValidationOptions, CountryCode } from "valinum";
```

The types resolve with every `moduleResolution` setting in your `tsconfig.json`: `node`, `node16`, `nodenext` and `bundler`, in both ES module and CommonJS files.

### 15.1 Functions

```ts
validate(input: string, options?: ValidationOptions): ValidationResult;
validateDRC(input: string, options?: ValidationOptions): ValidationResult;
// …one function per country, same signature (Chapter 10)
getSupportedCountries(): CountryInfo[];
```

### 15.2 Types

```ts
type CountryCode =
  | "CD" | "CG" | "CM" | "CI" | "SN"
  | "AO" | "GA" | "CF" | "GQ" | "NG"
  | "BJ" | "TG" | "GH" | "ZM" | "BF";

type LineType = "mobile" | "fixed";

interface CountryInfo {
  iso2: string; // "CD"
  dialCode: string; // "243"
  name: string; // "Democratic Republic of the Congo"
}

interface OperatorInfo {
  name: string; // "Vodacom"
  prefix: string; // "82"
}

interface NumberInfo {
  national: string; // "082 470 8027"
  international: string; // "+243 824 708 027"
  e164: string; // "+243824708027"
}

type ValidationError =
  | "EMPTY_INPUT"
  | "INVALID_CHARACTERS"
  | "INVALID_COUNTRY_CODE"
  | "INVALID_LENGTH"
  | "INVALID_PREFIX"
  | "TOO_SHORT"
  | "TOO_LONG"
  | null;

interface ValidationOptions {
  accept00Prefix?: boolean; // default true
  strict?: boolean; // default false
  country?: CountryCode;
  defaultCountry?: CountryCode; // default "CD"
  countries?: CountryCode[];
}

interface ValidationResult {
  valid: boolean;
  country: CountryInfo | null;
  operator: OperatorInfo | null;
  number: NumberInfo | null;
  lineType?: LineType | null;
  error: ValidationError;
}
```

---

## Chapter 16. Frequently asked questions

**A number I know is real is rejected. Why?**
Check, in this order: is it written in the current format (Chapter 12.7)? Is it valid in several countries, so ValiNum refuses to guess (Chapter 8.2)? Is its prefix in the list of Chapter 11? If a real, current number is still rejected, the operator may have received a new range: please open an issue with the prefix.

**`validate()` says DR Congo for a number from another country.**
When a number is invalid, `country` only shows the country ValiNum tried (the default country). Check `valid` first (Chapter 5.5).

**My users are all in one country. Do I need to do anything?**
Set `defaultCountry` to that country. If you also want to reject other countries, use `country` instead.

**Does a valid number mean the phone is switched on?**
No. ValiNum checks the shape and the prefix, not the line itself. Send a code by SMS to confirm a number (Chapter 2.4).

**The operator shown is wrong.**
The user may have moved their number to another operator (number portability). The prefix shows the operator the number was originally given to.

**Can I use ValiNum with React, Vue, Angular or Svelte?**
Yes. Install it with npm and call `validate()` in your component, for example in the change handler of your input.

**Does ValiNum work without internet?**
Yes. Installed with npm, it contains all the data and makes no network request.

**How big is it?**
The minified file `valinum.min.js` weighs about 11 KB and has no dependencies.

---

## Chapter 17. Contributing and versions

### 17.1 Working on the code

```bash
git clone https://github.com/fomadev/valinum.git
cd valinum
npm install
npm test        # run the automated tests
npm run build   # rebuild the files in dist/
```

The `dist/` folder is committed to the repository, because CDNs serve it straight from GitHub. After changing the code, run `npm run build` and commit `dist/` too; the CI fails if you forget.

### 17.2 Adding a country

1. Create `src/countries/<country>.ts` with a `CountryDefinition` (Chapter 14.2) and a `validate<Country>()` function.
2. Add the country code to `CountryCode` in `src/types.ts`.
3. Register the country in `COUNTRIES` in `src/countries/index.ts`, and add it to a **new** group at the end of `DETECTION_TIERS`, so existing numbers keep their meaning (Chapter 8.3).
4. Export the validator from `src/index.ts`.
5. Write tests in `tests/`, update the documentation and `CHANGELOG.md`.
6. Run `npm test` and `npm run build`, then open a pull request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the rules of contribution.

### 17.3 Versions (SemVer)

ValiNum follows [Semantic Versioning](https://semver.org). A version number has three parts, `MAJOR.MINOR.PATCH`:

| Change | Example | Meaning for you |
| --- | --- | --- |
| **PATCH** (`2.2.0` → `2.2.1`) | A corrected prefix, a bug fix | Update without worry |
| **MINOR** (`2.2.0` → `2.3.0`) | A new country, a new option | Update without worry; you get new features |
| **MAJOR** (`2.2.0` → `3.0.0`) | A change that can break existing code | Read the changelog before updating |

Every change is listed in [CHANGELOG.md](CHANGELOG.md).

### 17.4 Releases

A release is published by pushing a tag such as `v2.2.0`. GitHub Actions then runs the tests, builds the files, creates the GitHub release with notes taken from the changelog, and publishes the package to npm. The tag must match the version in `package.json`.

---

## Chapter 18. Summary and cheat sheet

### What you learned

- A phone number is made of a **country code** and a **national number**, whose first digits identify the **operator**.
- `validate()` cleans the input, finds the country and the operator, and returns three formats.
- Always check **`valid`** before using the other fields.
- Store **`number.e164`**, display `national` or `international`.
- Use **`defaultCountry`**, **`country`** or **`countries`** to tell ValiNum where your users are.
- ValiNum never guesses between countries, and an update never changes the meaning of a number it already accepted.

### Cheat sheet

```js
import { validate, getSupportedCountries } from "valinum";

const r = validate("082 470 80 27");

r.valid; // true
r.country.name; // "Democratic Republic of the Congo"
r.operator.name; // "Vodacom"
r.lineType; // "mobile"
r.number.national; // "082 470 8027"
r.number.international; // "+243 824 708 027"
r.number.e164; // "+243824708027"
r.error; // null

validate(input, { defaultCountry: "SN" }); // try Senegal first
validate(input, { country: "SN" }); // Senegal only
validate(input, { countries: ["CD", "CG"] }); // these countries only
validate(input, { strict: true }); // require +country code

getSupportedCountries(); // the 15 countries
```

---

## Appendix. Glossary

| Term | Definition |
| --- | --- |
| **CDN** | Content Delivery Network: a public server that hosts files such as `valinum.min.js` so web pages can load them |
| **Country code** | Digits identifying a country in international calls (`243`), also called dial code |
| **E.164** | International standard for writing a number: `+`, country code, national number, no spaces |
| **Fixed line** | A landline phone installed in a building |
| **International prefix** | `+` or `00`, written before a country code |
| **ISO 3166-1 alpha-2** | The two-letter country codes used by ValiNum (`CD`, `SN`…) |
| **Mobile** | A number belonging to a SIM card |
| **National number** | The number without the country code (`824708027`) |
| **npm** | The package manager for JavaScript, used to install libraries |
| **Numbering plan** | The rules of a country: length of numbers and which prefixes belong to whom |
| **Operator** | The telecom company that provides the line (Vodacom, MTN, Orange…) |
| **Operator prefix** | The first digits of a national number, identifying the operator |
| **Portability** | Keeping your number when changing operators |
| **SemVer** | Semantic Versioning, the `MAJOR.MINOR.PATCH` version scheme |
| **Trunk prefix** | A digit (usually `0`) dialled before national numbers in some countries |
| **UMD / ES module / CommonJS** | Three ways of packaging JavaScript code, for `<script>` tags, `import` and `require` |

---

## License

ValiNum is distributed under the Fordima Public License (FPL) v1.0. See the [LICENSE](LICENSE) file.
