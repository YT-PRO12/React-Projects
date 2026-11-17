import test from "node:test";
import assert from "node:assert/strict";
import { validateRates } from "./validateRates.js";

function snapshot(rates) {
  return { result: "success", base_code: "USD", rates };
}

test("unit base rate permits valid conversions without modifying provider data", () => {
  const original = snapshot({ USD: 1, INR: 86.4, EUR: 0.93 });
  const verified = validateRates(original, "USD");
  assert.deepEqual(verified, { USD: 1, INR: 86.4, EUR: 0.93 });
  assert.equal(original.rates.USD, 1);
});

test("missing or nonunit base rates are rejected", () => {
  for (const rates of [
    { INR: 86.4 },
    { USD: 0.99, INR: 86.4 },
    { USD: 1.01, EUR: 0.93 },
    { USD: null, GBP: 0.8 },
    { USD: "1", JPY: 150 },
  ]) {
    assert.throws(
      () => validateRates(snapshot(rates), "USD"),
      /Base currency unit rate is invalid/,
    );
  }
});

test("mismatched base code remains rejected", () => {
  const other = { result: "success", base_code: "EUR", rates: { EUR: 1 } };
  assert.throws(() => validateRates(other, "USD"), /Currency response/);
});
