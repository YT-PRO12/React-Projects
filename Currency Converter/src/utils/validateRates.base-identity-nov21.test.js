import test from "node:test";
import assert from "node:assert/strict";
import { validateRates } from "./validateRates.js";

function snapshot(rates) {
  return { result: "success", base_code: "USD", rates };
}

test("verified base rate is exactly one and input is unchanged", () => {
  const rates = { USD: 1, INR: 85.5, EUR: 0.91 };
  const before = { ...rates };
  const parsed = validateRates(snapshot(rates), "USD");
  assert.deepEqual(parsed, before);
  assert.deepEqual(rates, before);
  assert.notStrictEqual(parsed, rates);
});

test("missing, zero, negative, coerced and inconsistent base rates fail closed", () => {
  for (const invalid of [undefined, 0, -1, 0.9999, 1.0001, "1", NaN, Infinity]) {
    const rates = { USD: invalid, INR: 85.5 };
    assert.throws(
      () => validateRates(snapshot(rates), "USD"),
      /Currency response base rate is invalid/,
      `Rejected provider base rate ${String(invalid)}`,
    );
  }
});

test("source currency remains an exact provider identity", () => {
  assert.throws(
    () => validateRates(snapshot({ USD: 1, INR: 85.5 }), "INR"),
    /Currency response/,
  );
});
