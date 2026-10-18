# ValiNum v2.1.0 Documentation

## Introduction

ValiNum is a small library that helps you validate telephone numbers in a structured and predictable way. In this version, the goal is simple: take a phone number written in different forms, normalize it, understand what it represents, and return a clear result that your application can use.

This guide is written for beginners. If you are new to JavaScript libraries, TypeScript, or phone validation, you will still be able to follow it from the beginning. By the end, you should understand:

- what ValiNum does
- how it accepts different input formats
- how validation results are structured
- how the library is organized internally
- how to use it in a real project

## What problem does ValiNum solve?

People enter phone numbers in many different ways. One user may write:

```txt
0824708027
```

Another may write:

```txt
+243 824 708 027
```

Another may use:

```txt
00243 824 708 027
```

All of these may refer to the same number. ValiNum helps you handle those variations consistently.

## What ValiNum supports

In version 2.1.0, the library supports five countries: the Democratic Republic of the Congo (`CD`), the Republic of the Congo (`CG`), Cameroon (`CM`), Côte d'Ivoire (`CI`) and Senegal (`SN`). It supports:

- national numbers such as `0824708027`
- international numbers such as `+243824708027`
- numbers written with spaces, hyphens, dots, or parentheses
- the `00` prefix as an alternative to `+`
- automatic country detection
- operator and line type (mobile or fixed) detection for every country
- formatting in national, international, and E.164 forms

## Installation

Install the package with npm:

```bash
npm install valinum
```

If you are using a browser directly, you can also load one of the built files from the distribution folder.

## Your first example

Here is the most basic example:

```ts
import { validate } from "valinum";

const result = validate("0824708027");

console.log(result.valid);
console.log(result.number?.e164);
```

If everything works, the output will show that the number is valid and that its E.164 form is `+243824708027`.

## How validation works

The validation process is divided into four simple steps:

1. normalization
2. parsing
3. validation
4. formatting

Each step has a clear role.

### 1. Normalization

Normalization is the first step. Its job is to clean the input so the library can work with it more easily.

For example, this input:

```txt
082 470-80-27
```

is transformed into:

```txt
0824708027
```

This step removes spaces, hyphens, dots, and parentheses. It also converts the `00` prefix to `+` when allowed.

### 2. Parsing

Once the input is normalized, the parser examines the structure of the number. It decides whether the number is:

- a national number
- an international number
- a number that includes the country code

This step helps the library understand what part is the country code and what part is the national number.

### 3. Validation

Validation checks whether the number follows the expected rules.

For example, the library checks:

- whether the input is empty
- whether it contains invalid characters
- whether it is too short
- whether it is too long
- whether the operator prefix is valid
- whether the number matches the numbering plan of its country

### 4. Formatting

If the number passes validation, ValiNum returns a formatted version of it in different styles:

- national format
- international format
- E.164 format

## Supported input formats

ValiNum accepts many common forms.

### National format

```ts
validate("0824708027");
```

### International format with `+`

```ts
validate("+243824708027");
```

### International format without `+`

```ts
validate("243824708027");
```

### International format with `00`

```ts
validate("00243824708027");
```

### Formatted input with separators

```ts
validate("082 470 80 27");
validate("082-470-80-27");
validate("082.470.80.27");
validate("(082) 470 80 27");
validate("+243 824 708 027");
```

## Options

The validation function accepts optional settings.

### `accept00Prefix`

This option allows the library to understand `00` as the international prefix.

```ts
const result = validate("00243824708027");
```

This is enabled by default.

### `strict`

This option makes validation stricter. In strict mode, the library expects the number to use an explicit international form such as `+243...`, `243...`, or `00243...`.

```ts
const result = validate("0824708027", { strict: true });
```

### `country`

Validate against a single country. Detection is disabled and numbers from any other country are rejected with `INVALID_COUNTRY_CODE`.

```ts
validate("77 123 45 67", { country: "SN" }); // valid
validate("+237671234567", { country: "SN" }); // INVALID_COUNTRY_CODE
```

### `defaultCountry`

The country tried first for a national number (a number written without a country code). Default: `"CD"`.

```ts
validate("222123456", { defaultCountry: "CM" }); // Cameroon fixed line
```

### `countries`

Restrict automatic detection to some countries.

```ts
validate("77 123 45 67", { countries: ["CD", "CG"] }); // not valid
```

## Automatic country detection

You do not need to tell ValiNum which country a number comes from. `validate` works it out in this order:

1. **Country code**: `+237...` or `00237...` is Cameroon, `+221...` is Senegal, and so on. An unsupported code such as `+33` returns `INVALID_COUNTRY_CODE`.
2. **Default country**: a national number is first checked against `defaultCountry` (the DRC unless you change it).
3. **Country code without `+`**: `237671234567` is detected as Cameroon because its length matches the Cameroonian plan.
4. **National number of another country**: `77 123 45 67` is recognized as Senegal because no other country accepts it.

When a national number is valid in several countries (for example `222 123 456`, a fixed line in both Cameroon and Congo-Brazzaville), ValiNum never guesses: it returns the default country's result. Set `defaultCountry` to resolve it.

```ts
validate("+242 06 123 4567").country?.iso2; // "CG"
validate("237671234567").country?.iso2;     // "CM"
validate("07 07 12 34 56").country?.iso2;   // "CI"
validate("77 123 45 67").country?.iso2;     // "SN"
```

Each country also has its own validator: `validateDRC`, `validateCongoBrazzaville`, `validateCameroon`, `validateIvoryCoast` and `validateSenegal`. `getSupportedCountries()` lists them all.

## Result object

When you call `validate`, you receive a result object.

```ts
interface ValidationResult {
  valid: boolean;
  country: CountryInfo | null;
  operator: OperatorInfo | null;
  number: NumberInfo | null;
  lineType?: "mobile" | "fixed" | null;
  error: ValidationError;
}
```

### Example

```ts
const result = validate("0824708027");

console.log(result.valid);
console.log(result.country?.name);
console.log(result.operator?.name);
console.log(result.number?.national);
console.log(result.number?.international);
console.log(result.number?.e164);
```

A successful result may look like this:

```ts
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

## Error codes

When validation fails, the library returns an error code.

Common values include:

- `EMPTY_INPUT`
- `INVALID_CHARACTERS`
- `INVALID_COUNTRY_CODE`
- `INVALID_LENGTH`
- `INVALID_PREFIX`
- `TOO_SHORT`
- `TOO_LONG`
- `null`

Example:

```ts
const result = validate("082470802");

console.log(result.valid); // false
console.log(result.error); // "TOO_SHORT"
```

## Supported operators

Prefixes are the first digits of the national number.

### Democratic Republic of the Congo (`CD`, `+243`)

9 digits, trunk prefix `0` (`082 470 8027`).

- Vodacom: `81`, `82`, `83`, `86`
- Orange: `80`, `84`, `85`, `89`
- Africell: `90`, `91`
- Airtel: `97`, `98`, `99`

### Republic of the Congo (`CG`, `+242`)

9 digits, no trunk prefix: the leading `0` belongs to the number (`+242 06 123 4567`).

- MTN: `06`
- Airtel: `05`, `04` (former Warid range)
- Equateur Telecom: `01`
- Congo Telecom: mobile `0240`, `0255`–`0258`, `0260`, `02610`–`02615`, `02666`–`02669`, `0267`–`0269`; fixed `2221`–`2225`, `2228`, `2229`

### Cameroon (`CM`, `+237`)

9 digits, no trunk prefix (`6 71 23 45 67`).

- MTN: `650`–`654`, `67`, `680`–`683`
- Orange: `640`–`642`, `655`–`659`, `686`–`689`, `69`
- Nexttel: `66`, `684`, `685`
- Camtel: mobile `62`, `242`, `243`; fixed `222`, `233`

### Côte d'Ivoire (`CI`, `+225`)

10 digits since 2021, no trunk prefix (`07 07 12 34 56`).

- Orange: mobile `07`, fixed `27`
- MTN: mobile `05`, fixed `25`
- Moov: mobile `01`, fixed `21`

### Senegal (`SN`, `+221`)

9 digits, no trunk prefix (`77 123 45 67`).

- Orange: mobile `71`, `77`, `78`; fixed `338`, `339`
- Yas (formerly Free): mobile `76`, fixed `32`
- Expresso: mobile `70`, fixed `30`
- Promobile: `75`
- Hayo: mobile `721`, fixed `36`
- ADIE: `790`

## Formatting examples

The library can return the same number in three formats.

### National format

```ts
const result = validate("0824708027");
console.log(result.number?.national);
// 082 470 8027
```

### International format

```ts
const result = validate("0824708027");
console.log(result.number?.international);
// +243 824 708 027
```

### E.164 format

```ts
const result = validate("0824708027");
console.log(result.number?.e164);
// +243824708027
```

## How the library is organized

The v2.1.0 code is split into a few simple modules.

```txt
src/
├── core/
│   ├── engine.ts
│   ├── normalize.ts
│   ├── parser.ts
│   ├── validator.ts
│   └── formatter.ts
├── countries/
│   ├── index.ts
│   ├── drc.ts
│   ├── congo.ts
│   ├── cameroon.ts
│   ├── ivory-coast.ts
│   └── senegal.ts
├── validate.ts
├── types.ts
└── index.ts
```

### Core modules

- `normalize.ts` cleans the input and removes formatting noise
- `parser.ts` understands the structure of the number
- `validator.ts` applies validation rules
- `formatter.ts` formats the final output
- `engine.ts` runs the same validation pipeline for every country

### Country modules

Each file in `countries/` only describes a numbering plan: dial code, national length, trunk prefix, operator ranges and display format. `countries/index.ts` registers them, and `validate.ts` handles automatic detection.

Adding a country means writing one new definition file and registering it. No core code changes.

## Development workflow

If you want to work on the project locally, use these commands:

```bash
npm install
npm test
npm run build
```

The build generates:

- `dist/valinum.js`
- `dist/valinum.min.js`
- `dist/valinum.mjs`

## Summary

By now, you should understand that ValiNum v2.1.0 is a simple and modular library for validating phone numbers from five African countries. It accepts many common input styles, normalizes them, validates them, and returns structured results you can use in applications.

If you want to go further, the next step is to use it in a real form, a backend API, or a frontend interface.

## License

This project is distributed under the FomaDev Public License.
