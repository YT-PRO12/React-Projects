import test from "node:test";
import assert from "node:assert/strict";
import { convertAmount } from "./convertAmount.js";

test("valid decimal notation remains usable with fixed two-place formatting", () => {
  assert.equal(convertAmount("12", 2), "24.00");
  assert.equal(convertAmount(".5", 2), "1.00");
  assert.equal(convertAmount("1.", 1), "1.00");
  assert.equal(convertAmount("1e3", 1), "1000.00");
  assert.equal(convertAmount(" +2.25 ", 2), "4.50");
  assert.equal(convertAmount(10, 1), "10.00");
});

test("nondecimal notation cannot silently become a monetary amount", () => {
  for (const value of ["0x10", "0XFF", "0b101", "0o10", "1_000", "2,500"]) {
    assert.throws(
      () => convertAmount(value, 1),
      /Enter a valid, non-negative amount/,
      `Expected to reject ${value}`,
    );
  }
});

test("malformed exponent notation is rejected but real overflow remains guarded", () => {
  for (const value of ["1e", "1e++2", ".e2", "1e-"]) {
    assert.throws(() => convertAmount(value, 1), RangeError);
  }
  assert.throws(() => convertAmount("1e21", 1), /too large/);
});
