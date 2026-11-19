import test from "node:test";
import assert from "node:assert/strict";
import { validateRates } from "./validateRates.js";

test("rate payload must be a genuine mapping with valid code keys", () => {
  for (const rates of [null, undefined, "USD", 1, [], {}]) {
    assert.throws(
      () => validateRates({ result: "success", base_code: "USD", rates }, "USD"),
      /Currency response|No valid exchange rates/,
    );
  }
});

test("accept only valid positive finite rate entries and preserve source", () => {
  const rates = { USD: 1, INR: 87.5, x: 6, GBP: -2, JPY: Infinity, CAD: 0 };
  const payload = { result: "success", base_code: "USD", rates };
  const snapshot = { ...rates };
  const result = validateRates(payload, "USD");
  assert.deepEqual(result, { USD: 1, INR: 87.5 });
  assert.deepEqual(rates, snapshot);
  assert.notStrictEqual(result, rates);
});

test("base-code case and mismatches are rejected rather than normalized silently", () => {
  const payload = { result: "success", base_code: "USD", rates: { USD: 1 } };
  assert.throws(() => validateRates(payload, "usd"), /Currency response/);
  assert.throws(() => validateRates(payload, "EUR"), /Currency response/);
});
