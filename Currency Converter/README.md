# Currency Converter — React + Vite

A small React currency-conversion application with an accessible amount form, currency selectors, and defensive exchange-rate requests.

## Features

- Choose a source and target from USD, INR, EUR, GBP, and JPY.
- Enter a non-negative amount and press **Convert** or **Enter** to calculate.
- Read the converted amount in a read-only, labeled output field.
- See an error if the amount is invalid or exchange rates are unavailable.
- Changing input clears an earlier result so stale values are not presented as a new conversion.
- Abort obsolete exchange-rate requests when the source currency changes.

## Run locally

From the `Currency Converter` directory:

```bash
npm ci
npm run dev
```

For a production bundle and static review:

```bash
npm run lint
npm run build
npm run preview
```

This project uses React, Vite, and Tailwind CSS. Consult `package.json` for installed package versions.

## Rates and reliability

The client requests `https://open.er-api.com/v6/latest/{currency}` and only accepts positive finite numeric rates with three-letter currency codes. Rate availability, update frequency, and allowed usage depend on the external provider; no claim is made that conversions represent live tradable bank rates.

The client does not collect bank information or execute transfers. It is a browser demonstration, not a payment or financial advice application. Network failures clear the rate table instead of presenting fabricated exchange rates.

## Manual verification

1. Convert a positive amount, then change the target currency; the previous result should clear.
2. Press Enter while focused on the amount field; the form should submit.
3. Try empty, negative, and extremely large amounts; invalid conversions should show an error.
4. Throttle the network and switch source currencies quickly; obsolete responses must not replace the latest rates.
5. Simulate an API failure and confirm the page does not show a newly calculated amount.
6. Check visible focus, keyboard-only navigation, and mobile layouts.

These are test scenarios, not claims of automated end-to-end test coverage.
