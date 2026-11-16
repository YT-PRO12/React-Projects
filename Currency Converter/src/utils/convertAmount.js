/** Convert a finite nonnegative amount using a positive finite rate. */
export function convertAmount(rawAmount, rate) {
  if (
    typeof rawAmount !== "string" && typeof rawAmount !== "number"
  ) {
    throw new RangeError("Enter a valid, non-negative amount.");
  }

  const value = String(rawAmount).trim();
  const amount = Number(value);
  if (value === "" || !Number.isFinite(amount) || amount < 0) {
    throw new RangeError("Enter a valid, non-negative amount.");
  }
  if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
    throw new RangeError("Exchange rates are unavailable. Please try again.");
  }
  const converted = amount * rate;
  if (!Number.isFinite(converted) || converted >= 1e21) {
    throw new RangeError("Amount is too large to convert.");
  }
  return converted.toFixed(2);
}
