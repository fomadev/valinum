# ValiNum

ValiNum is a lightweight JavaScript and TypeScript library for validating and formatting phone numbers in 15 African countries. You pass it whatever the user typed; ValiNum works out the country, the operator, the line type and the standard formats. You never have to hard-code prefixes such as "82 is Vodacom" in your own code.

For the full beginner-friendly guide, see [DOCUMENTATION.md](DOCUMENTATION.md). Release notes are in [CHANGELOG.md](CHANGELOG.md).

## Supported countries

| Country | Code | Dial code | Operators |
| --- | --- | --- | --- |
| Angola | `AO` | `+244` | Unitel, Movicel, Africell |
| Benin | `BJ` | `+229` | MTN, Moov, Celtiis |
| Burkina Faso | `BF` | `+226` | Orange, Moov Africa, Telecel Faso |
| Cameroon | `CM` | `+237` | MTN, Orange, Nexttel, Camtel |
| Central African Republic | `CF` | `+236` | Orange, Telecel, Moov Africa, Socatel |
| Côte d'Ivoire | `CI` | `+225` | Orange, MTN, Moov |
| Democratic Republic of the Congo | `CD` | `+243` | Vodacom, Orange, Airtel, Africell |
| Equatorial Guinea | `GQ` | `+240` | GETESA, Muni |
| Gabon | `GA` | `+241` | Airtel, Moov Africa |
| Ghana | `GH` | `+233` | MTN, Telecel, AT |
| Nigeria | `NG` | `+234` | MTN, Airtel, Glo, 9mobile, Ntel, Smile, MAFAB… |
| Republic of the Congo (Congo-Brazzaville) | `CG` | `+242` | MTN, Airtel, Equateur Telecom, Congo Telecom |
| Senegal | `SN` | `+221` | Orange, Yas, Expresso, Promobile, Hayo, ADIE |
| Togo | `TG` | `+228` | Yas, Moov Africa |
| Zambia | `ZM` | `+260` | Airtel, MTN, Zamtel, Zedmobile |

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

### Without installing (CDN)

The built files in `dist/` are published on npm and committed to GitHub, so you can load them straight from a CDN. Pin an exact version in production.

| File | Format | Use it for |
| --- | --- | --- |
| `dist/valinum.min.js` | UMD, minified | `<script>` tag, exposes `window.ValiNum` |
| `dist/valinum.js` | UMD | same, readable for debugging |
| `dist/valinum.mjs` | ES module | `import` in modern browsers and Deno |

**Script tag** (global `ValiNum`):

```html
<!-- From npm -->
<script src="https://cdn.jsdelivr.net/npm/valinum@2.2.0/dist/valinum.min.js"></script>

<!-- Or straight from GitHub (needs the v2.2.0 tag) -->
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.2.0/dist/valinum.min.js"></script>

<script>
  ValiNum.validate("0824708027").operator.name; // "Vodacom"
</script>
```

**ES module**:

```html
<script type="module">
  import { validate } from "https://cdn.jsdelivr.net/npm/valinum@2.2.0/dist/valinum.mjs";

  validate("+237 671 23 45 67").country.name; // "Cameroon"
</script>
```

Short URLs also work and serve the minified file: `https://cdn.jsdelivr.net/npm/valinum@2.2.0` and `https://unpkg.com/valinum@2.2.0`.

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
validateDRC, validateCongoBrazzaville, validateCameroon, validateIvoryCoast, validateSenegal,
validateAngola, validateGabon, validateCentralAfricanRepublic, validateEquatorialGuinea,
validateNigeria, validateBenin, validateTogo, validateGhana, validateZambia, validateBurkinaFaso
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
