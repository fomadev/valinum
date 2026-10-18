# ValiNum

ValiNum is a lightweight JavaScript and TypeScript library for validating and formatting phone numbers in Central and West Africa. You pass it whatever the user typed; ValiNum works out the country, the operator, the line type and the standard formats. You never have to hard-code prefixes such as "82 is Vodacom" in your own code.

For the full beginner-friendly guide, see [DOCUMENTATION.md](DOCUMENTATION.md). Release notes are in [CHANGELOG.md](CHANGELOG.md).

## Supported countries

| Country | Code | Dial code | Operators |
| --- | --- | --- | --- |
| Democratic Republic of the Congo | `CD` | `+243` | Vodacom, Orange, Airtel, Africell |
| Republic of the Congo (Congo-Brazzaville) | `CG` | `+242` | MTN, Airtel, Equateur Telecom, Congo Telecom |
| Cameroon | `CM` | `+237` | MTN, Orange, Nexttel, Camtel |
| Côte d'Ivoire | `CI` | `+225` | Orange, MTN, Moov |
| Senegal | `SN` | `+221` | Orange, Yas, Expresso, Promobile, Hayo, ADIE |

## What ValiNum can do

- detect the country automatically, from `+237...`, `00221...`, `242...` or even a national number
- validate local and international numbers against each country's numbering plan
- normalize common formatting such as spaces, hyphens, dots, and parentheses
- detect the operator and whether the line is mobile or fixed
- return results in national, international, and E.164 formats, written the way each country writes them

## Installation

```bash
npm install valinum
```

## Quick example

```ts
import { validate } from "valinum";

validate("0824708027").operator?.name;          // "Vodacom"
validate("+237 671 23 45 67").country?.name;     // "Cameroon"
validate("07 07 12 34 56").number?.e164;          // "+2250707123456"
validate("77 123 45 67").number?.international;   // "+221 77 123 45 67"
validate("06 123 4567").lineType;                 // "mobile"
```

## Main API

```ts
validate(input: string, options?: ValidationOptions)
```

### Supported options

- `accept00Prefix`: allows `00` to be treated as the international prefix. Default: `true`
- `strict`: only accepts explicit international forms such as `+243...`, `243...`, or `00243...`. Default: `false`
- `country`: validate against one country only, for example `"SN"`. Disables detection.
- `defaultCountry`: country tried first for national numbers. Default: `"CD"`
- `countries`: restrict detection to a list, for example `["CD", "CG"]`

### Per-country validators

```ts
validateDRC, validateCongoBrazzaville, validateCameroon, validateIvoryCoast, validateSenegal
```

## Result shape

```ts
{
  valid: boolean;
  country: CountryInfo | null;
  operator: OperatorInfo | null;
  number: NumberInfo | null;
  lineType?: "mobile" | "fixed" | null;
  error: ValidationError;
}
```

## Versioning

ValiNum follows [Semantic Versioning](https://semver.org/): a new country or option is a minor release, a data or bug fix is a patch, and only an incompatible API change is a major release.

## Development

```bash
npm install
npm test
npm run build
```

## More information

The complete documentation, including a full tutorial from the basics to advanced usage, is available in [DOCUMENTATION.md](DOCUMENTATION.md).
