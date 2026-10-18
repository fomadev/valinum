# Changelog

All notable changes to ValiNum are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- **MAJOR** (`X.0.0`): incompatible API changes
- **MINOR** (`2.X.0`): new features that stay backward compatible (new countries, new options)
- **PATCH** (`2.1.X`): backward compatible bug fixes and operator data corrections

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
