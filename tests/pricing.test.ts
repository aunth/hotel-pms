import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stayCost } from '../src/modules/booking/pricing.ts';

test('stay cost is nights multiplied by the nightly rate', () => {
  assert.equal(stayCost('2026-07-01', '2026-07-04', 1500), 4600);
});

test('one night is the shortest stay and costs exactly one rate', () => {
  assert.equal(stayCost('2026-07-01', '2026-07-02', 1500), 1500);
});

test('a free service booking costs zero', () => {
  assert.equal(stayCost('2026-07-01', '2026-07-03', 0), 0);
});

test('negative rate and invalid dates are rejected', () => {
  assert.throws(() => stayCost('2026-07-01', '2026-07-03', -1), RangeError);
  assert.throws(() => stayCost('2026-07-03', '2026-07-03', 1500), RangeError);
});
