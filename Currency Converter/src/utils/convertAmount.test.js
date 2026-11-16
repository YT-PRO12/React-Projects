import test from "node:test";
import assert from "node:assert/strict";
import { convertAmount } from "./convertAmount.js";

test("converts zero and decimal input with fixed two-digit display", () => {
  assert.equal(convertAmount("0", 85.5), "0.00");
  assert.equal(convertAmount("12.25", 2), "24.50");
  assert.equal(convertAmount(5, 1), "5.00");
});

test("invalid, negative and overflowing inputs are rejected", () => {
  for (const amount of ["", " ", "-0.01", "Infinity", "1e309", null, true]) {
    assert.throws(
      () => convertAmount(amount, 1),
      /Enter a valid, non-negative amount/,
    );
  }
  assert.throws(() => convertAmount("1e21", 1), /too large/);
});

test("invalid provider rates are rejected independently of amount", () => {
  for (const rate of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, "1.5"]) {
    assert.throws(
      () => convertAmount("10", rate),
      /Exchange rates are unavailable/,
    );
  }
});
