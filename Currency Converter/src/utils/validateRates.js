/**
 * Validate a third-party exchange-rate snapshot before it reaches the UI.
 * Invalid entries are omitted; a wrong base or empty result is rejected.
 */
export function validateRates(payload, baseCurrency) {
  if (
    typeof baseCurrency !== "string" ||
    !/^[A-Z]{3}$/.test(baseCurrency) ||
    !payload ||
    payload.result !== "success" ||
    payload.base_code !== baseCurrency ||
    !payload.rates ||
    typeof payload.rates !== "object" ||
    Array.isArray(payload.rates)
  ) {
    throw new Error("Currency response is unavailable");
  }

  const rates = Object.fromEntries(
    Object.entries(payload.rates).filter(
      ([code, rate]) =>
        /^[A-Z]{3}$/.test(code) &&
        typeof rate === "number" &&
        Number.isFinite(rate) &&
        rate > 0,
    ),
  );

  if (Object.keys(rates).length === 0) {
    throw new Error("No valid exchange rates were returned");
  }
  // A trustworthy base-currency snapshot must map the base back to 1.
  // Missing or inconsistent self-rates can signal a corrupted provider payload.
  if (rates[baseCurrency] !== 1) {
    throw new Error("Currency response base rate is invalid");
  }
  return rates;
}
