import test from "node:test";
import assert from "node:assert/strict";
import { convertAmount } from "./convertAmount.js";

test("finite fractions and same-currency rates return predictable display", () => {
  assert.equal(convertAmount("0", 1), "0.00");
  assert.equal(convertAmount("0.5", 2), "1.00");
  assert.equal(convertAmount("99.99", 1), "99.99");
});

test("coercion and numeric overflow cannot produce a displayed amount", () => {
  for (const amount of [null, true, {}, "", " ", "-10", "Infinity"]) {
    assert.throws(() => convertAmount(amount, 1), RangeError);
  }
  assert.throws(() => convertAmount("1e21", 1), /too large/);
  assert.throws(() => convertAmount("1", Number.NaN), /unavailable/);
});
