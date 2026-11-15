import test from "node:test";
import assert from "node:assert/strict";
import { validateRates } from "./validateRates.js";

test("valid exchange-rate snapshot retains only positive finite ISO-like codes", () => {
  const payload = {
    result: "success",
    base_code: "USD",
    rates: { USD: 1, INR: 86.5, EUR: 0.92, GBP: Number.NaN, JPY: -5, usd: 1, CAD: "1.3" },
  };
  const result = validateRates(payload, "USD");
  assert.deepEqual(result, { USD: 1, INR: 86.5, EUR: 0.92 });
  assert.equal(payload.rates.CAD, "1.3", "validation must not mutate provider data");
});

test("rejected or mismatched base-currency snapshots cannot be displayed", () => {
  const valid = { result: "success", base_code: "USD", rates: { USD: 1 } };
  for (const payload of [
    { ...valid, result: "error" },
    { ...valid, base_code: "EUR" },
    { ...valid, base_code: undefined },
    { ...valid, rates: [] },
    { ...valid, rates: { USD: Number.POSITIVE_INFINITY } },
    { ...valid, rates: {} },
    null,
  ]) {
    assert.throws(() => validateRates(payload, "USD"), /Currency response|No valid/);
  }
});

test("invalid source currency fails closed", () => {
  const payload = { result: "success", base_code: "USD", rates: { USD: 1 } };
  for (const base of ["usd", "US", "../USD", null]) {
    assert.throws(() => validateRates(payload, base), /Currency response/);
  }
});
