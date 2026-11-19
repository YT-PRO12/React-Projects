import test from "node:test";
import assert from "node:assert/strict";
import { convertAmount } from "./convertAmount.js";

test("conversion always formats two decimal places", () => {
  assert.equal(convertAmount("1", 1), "1.00");
  assert.equal(convertAmount("0.25", 4), "1.00");
  assert.equal(convertAmount("2.5", 0.5), "1.25");
  assert.equal(convertAmount("0.001", 1), "0.00");
});

test("invalid exchange rates cannot be coerced from strings or booleans", () => {
  for (const rate of ["1", true, false, null, undefined, 0, -1]) {
    assert.throws(() => convertAmount("10", rate), RangeError);
  }
});

test("overflow at the result boundary fails closed", () => {
  assert.throws(() => convertAmount("1e20", 10), /too large/);
  assert.equal(convertAmount("1", 1e-10), "0.00");
});
