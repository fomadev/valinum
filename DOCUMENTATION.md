# ValiNum v2.2.0 Documentation

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

In version 2.2.0, the library supports 15 countries: the Democratic Republic of the Congo (`CD`), the Republic of the Congo (`CG`), Cameroon (`CM`), Côte d'Ivoire (`CI`), Senegal (`SN`), Angola (`AO`), Gabon (`GA`), the Central African Republic (`CF`), Equatorial Guinea (`GQ`), Nigeria (`NG`), Benin (`BJ`), Togo (`TG`), Ghana (`GH`), Zambia (`ZM`) and Burkina Faso (`BF`). It supports:

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

### Using ValiNum without a build step

If you are using a browser directly, load a built file from a CDN. ValiNum ships three files in `dist/`:

- `valinum.min.js`: minified UMD build. Loaded with a `<script>` tag, it creates a global `ValiNum` object.
- `valinum.js`: the same UMD build, not minified, easier to debug.
- `valinum.mjs`: ES module build, for `import` in modern browsers.

These files are published on npm and committed to the GitHub repository, so both of these work:

```html
<!-- From npm, through jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/valinum@2.2.0/dist/valinum.min.js"></script>

<!-- From the GitHub repository, through jsDelivr (uses the v2.2.0 tag) -->
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.2.0/dist/valinum.min.js"></script>
```

Then use the global object:

```html
<input id="phone" />
<script>
  document.getElementById("phone").addEventListener("input", (event) => {
    const result = ValiNum.validate(event.target.value);
    console.log(result.valid, result.country?.name, result.operator?.name);
  });
</script>
```

With an ES module:

```html
<script type="module">
  import { validate } from "https://cdn.jsdelivr.net/npm/valinum@2.2.0/dist/valinum.mjs";

  console.log(validate("77 123 45 67").country.name); // "Senegal"
</script>
```

Tips:

- Always pin an exact version (`@2.2.0`) in production. A branch such as `@main` can change at any time and is cached by the CDN.
- The short URLs `https://cdn.jsdelivr.net/npm/valinum@2.2.0` and `https://unpkg.com/valinum@2.2.0` serve the minified file.

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

When a national number is valid in several countries (for example `222 123 456`, a fixed line in both Cameroon and Congo-Brazzaville, or `70 12 34 56`, valid in Togo, Burkina Faso and the Central African Republic), ValiNum never guesses: it returns the default country's result. Set `defaultCountry` to resolve it.

Countries are checked in the order they were added to ValiNum: the five countries of 2.1.0 first, then the ten countries of 2.2.0. A new release therefore never changes the country of a number that an earlier release already recognized. For example, `077 123 4567` stays a Côte d'Ivoire number, even though it is also a valid Zambian number. Likewise, every Benin number (`01 …`) is also a valid Moov Côte d'Ivoire number, so Benin numbers need `defaultCountry: "BJ"` or the `+229` prefix.

With 15 countries, many national numbers look alike. If your users come from one country, set `defaultCountry`; if they come from a few, set `countries`; otherwise ask for the international format.

```ts
validate("+242 06 123 4567").country?.iso2; // "CG"
validate("237671234567").country?.iso2;     // "CM"
validate("07 07 12 34 56").country?.iso2;   // "CI"
validate("77 123 45 67").country?.iso2;     // "SN"
```

Each country also has its own validator: `validateDRC`, `validateCongoBrazzaville`, `validateCameroon`, `validateIvoryCoast`, `validateSenegal`, `validateAngola`, `validateGabon`, `validateCentralAfricanRepublic`, `validateEquatorialGuinea`, `validateNigeria`, `validateBenin`, `validateTogo`, `validateGhana`, `validateZambia` and `validateBurkinaFaso`. `getSupportedCountries()` lists them all.

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

### Angola (`AO`, `+244`)

9 digits, no trunk prefix (`923 123 456`). Mobile only.

- Unitel: `92`, `93`, `94`, `97`
- Movicel: `91`, `99`
- Africell: `95`, `96`

### Gabon (`GA`, `+241`)

8 digits since 2019, dialled with a leading `0` inside the country (`077 12 34 56` / `+241 77 12 34 56`).

- Airtel: `74`, `76`, `77`
- Moov Africa (Gabon Telecom): mobile `600`–`604`, `610`, `62`, `65`, `66`; fixed `11`

### Central African Republic (`CF`, `+236`)

8 digits, no trunk prefix (`75 12 34 56`).

- Orange: `72`, `73`, `74`
- Telecel: `75`, `76`
- Moov Africa: `70`
- Socatel: fixed `21`, `22`

### Equatorial Guinea (`GQ`, `+240`)

9 digits, no trunk prefix (`222 123 456`).

- GETESA: mobile `222`; fixed `33x` and `35x` blocks
- Muni: `55`

### Nigeria (`NG`, `+234`)

10 digits, trunk prefix `0` (`0803 123 4567`). Mobile only.

- MTN: `703`, `704`, `706`, `707`, `7025`, `7026`, `803`, `806`, `810`, `813`, `814`, `816`, `903`, `906`, `910`, `913`, `916`
- Airtel: `701`, `708`, `802`, `808`, `812`, `901`, `902`, `904`, `907`, `911`, `912`
- Glo: `705`, `805`, `807`, `811`, `815`, `905`, `915`
- 9mobile: `809`, `817`, `818`, `908`, `909`
- Ntel: `7021`, `7022`, `804` · Smile: `7020` · Prestel: `7024` · Multilinks: `7027`, `709` · Starcomms: `7028`, `7029`, `8190`, `8191` · Lebara: `72` · MAFAB: `801`

### Benin (`BJ`, `+229`)

10 digits since 2024, every number starts with `01` (`01 97 12 34 56`).

- MTN: `0142`, `0146`, `015`, `0161`, `0162`, `0166`, `0167`, `0169`, `0190`, `0191`, `0196`, `0197`
- Moov: `0145`, `0155`, `0158`, `0160`, `0163`–`0165`, `0168`, `0194`, `0195`, `0198`, `0199`
- Celtiis (SBIN): mobile `0128`, `014`, `0192`, `0193`; fixed `0120`–`0124`

### Togo (`TG`, `+228`)

8 digits, no trunk prefix (`90 12 34 56`).

- Yas (formerly Togocom): mobile `70`–`73`, `90`–`93`; fixed `222`–`227`, `232`, `233`, `244`, `245`, `255`, `266`, `267`, `277`
- Moov Africa: `78`, `79`, `96`–`99`

### Ghana (`GH`, `+233`)

9 digits, trunk prefix `0` (`024 123 4567`). Mobile only.

- MTN: `24`, `256`, `257`, `53`, `54`, `55`, `591`–`599`
- Telecel (formerly Vodafone): `20`, `50`
- AT (formerly AirtelTigo): `23`, `26`, `27`, `56`, `57`

### Zambia (`ZM`, `+260`)

9 digits, trunk prefix `0` (`097 123 4567`).

- Airtel: `97`, `77`, `57`
- MTN: `96`, `76`, `56`
- Zamtel: mobile `95`, `75`, `55`; fixed `211`–`218`
- Zedmobile: `98`

### Burkina Faso (`BF`, `+226`)

8 digits, no trunk prefix (`70 12 34 56`).

- Orange: `04`–`07`, `44`–`46`, `54`–`57`, `64`–`67`, `74`–`77`
- Moov Africa (ONATEL): mobile `01`–`03`, `50`–`53`, `60`–`63`, `70`–`73`; fixed `20`, `24` and `25` blocks
- Telecel Faso: `58`, `68`, `69`, `78`, `79`

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

The v2.2.0 code is split into a few simple modules.

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
│   ├── senegal.ts
│   ├── angola.ts
│   ├── gabon.ts
│   ├── central-african-republic.ts
│   ├── equatorial-guinea.ts
│   ├── nigeria.ts
│   ├── benin.ts
│   ├── togo.ts
│   ├── ghana.ts
│   ├── zambia.ts
│   └── burkina-faso.ts
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

By now, you should understand that ValiNum v2.1.0 is a simple and modular library for validating phone numbers from 15 African countries. It accepts many common input styles, normalizes them, validates them, and returns structured results you can use in applications.

If you want to go further, the next step is to use it in a real form, a backend API, or a frontend interface.

## License

This project is distributed under the FomaDev Public License.
