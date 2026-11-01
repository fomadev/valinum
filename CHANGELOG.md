# Changelog

All notable changes to ValiNum are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- **MAJOR** (`X.0.0`): incompatible API changes
- **MINOR** (`2.X.0`): new features that stay backward compatible (new countries, new options)
- **PATCH** (`2.1.X`): backward compatible bug fixes and operator data corrections

## [2.2.0] - 2026-11-01

### Added

- Ten new countries, with every active mobile range and the fixed-line ranges whose operator is known:
  - **Angola** (`AO`, `+244`): Unitel, Movicel, Africell (mobile)
  - **Gabon** (`GA`, `+241`): Airtel, Moov Africa (8-digit plan in force since 2019)
  - **Central African Republic** (`CF`, `+236`): Orange, Telecel, Moov Africa, Socatel (fixed)
  - **Equatorial Guinea** (`GQ`, `+240`): GETESA, Muni
  - **Nigeria** (`NG`, `+234`): MTN, Airtel, Glo, 9mobile, Ntel, Smile, MAFAB and others (mobile)
  - **Benin** (`BJ`, `+229`): MTN, Moov, Celtiis (10-digit plan in force since 2024)
  - **Togo** (`TG`, `+228`): Yas (formerly Togocom), Moov Africa
  - **Ghana** (`GH`, `+233`): MTN, Telecel (formerly Vodafone), AT (formerly AirtelTigo) (mobile)
  - **Zambia** (`ZM`, `+260`): Airtel, MTN, Zamtel, Zedmobile
  - **Burkina Faso** (`BF`, `+226`): Orange, Moov Africa, Telecel Faso
- Dedicated validators for each new country (`validateAngola`, `validateGabon`, `validateCentralAfricanRepublic`, `validateEquatorialGuinea`, `validateNigeria`, `validateBenin`, `validateTogo`, `validateGhana`, `validateZambia`, `validateBurkinaFaso`).
- Number ranges can carry a full-number pattern, for fixed-line plans that a prefix alone cannot describe.
- CDN support: `jsdelivr` and `unpkg` fields in `package.json`, so the short URLs `cdn.jsdelivr.net/npm/valinum@x.y.z` and `unpkg.com/valinum@x.y.z` serve `dist/valinum.min.js`. CDN usage is documented in the README and DOCUMENTATION.
- CI check that the committed `dist/` matches a fresh build, since CDNs serve it straight from GitHub.

### Changed

- Auto-detection of national numbers tries the countries supported since 2.1.0 first. A number that 2.1.0 recognized keeps the same country, even when it is also valid in a new country (for example `077 123 4567`: Côte d'Ivoire, also Zambia).

- `DOCUMENTATION.md` is rewritten as a complete course (Chapter 0 to Chapter 18, plus a glossary) for readers with no prior knowledge, and every example in it was checked against the library.

### Fixed

- `import { validate } from "valinum"` and `require("valinum")` now work in Node.js. The package only declared a `module` field, which Node ignores. It now ships a CommonJS build (`dist/valinum.cjs`) and declares `main` and an `exports` map (`import`, `require`, `types`). Deep imports such as `valinum/dist/valinum.min.js` keep working.

## [2.1.0] - 2026-10-18

### Added

- Four new countries, with every allocated mobile and fixed-line range:
  - **Republic of the Congo** (`CG`, `+242`): MTN, Airtel (including the former Warid range), Equateur Telecom, Congo Telecom
  - **Cameroon** (`CM`, `+237`): MTN, Orange, Nexttel, Camtel
  - **Côte d'Ivoire** (`CI`, `+225`): Orange, MTN, Moov (10-digit plan in force since 2021)
  - **Senegal** (`SN`, `+221`): Orange, Yas (formerly Free), Expresso, Promobile, Hayo, ADIE
- Automatic country detection in `validate()`:
  - from the country code (`+237...`, `00221...`)
  - from a country code written without `+` (`237671234567`)
  - from the shape of a national number (`77 123 45 67` → Senegal) when only one country matches
- New options: `country` (force one country), `defaultCountry` (country tried first for national numbers, default `"CD"`) and `countries` (restrict detection).
- `lineType` (`"mobile"` or `"fixed"`) in every result.
- Dedicated validators: `validateDRC`, `validateCongoBrazzaville`, `validateCameroon`, `validateIvoryCoast`, `validateSenegal`.
- `getSupportedCountries()` and `formatGroups()`.
- Country-agnostic validation engine: a new country only needs to describe its numbering plan.

### Changed

- Every number from another supported country is now recognized by `validate()`. Use `{ country: "CD" }` to keep accepting DRC numbers only.

### Fixed

- A number with an unknown country code (for example `+33...`) now returns `INVALID_COUNTRY_CODE` instead of a length error.
- `package.json` `types` now points to the generated `dist/index.d.ts`.
- TypeScript 6 configuration warnings (`rootDir`, `moduleResolution`).

## [2.0.1]

### Fixed

- Package version.

## [2.0.0]

### Added

- Rewrite in TypeScript with a modular core (normalize, parse, validate, format).
- Democratic Republic of the Congo support with operator detection.
