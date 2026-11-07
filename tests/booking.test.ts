import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nights, overlaps } from '../src/domain/booking.ts';

test('nights counts the nights between check-in and check-out', () => {
  assert.equal(nights('2026-07-01', '2026-07-04'), 3);
});

test('nights rejects check-out that is not after check-in', () => {
  assert.throws(() => nights('2026-07-04', '2026-07-04'), RangeError);
  assert.throws(() => nights('2026-07-05', '2026-07-04'), RangeError);
});

test('overlapping periods are detected', () => {
  assert.equal(overlaps('2026-07-01', '2026-07-05', '2026-07-03', '2026-07-08'), true);
});

test('check-out and check-in on the same day do not overlap', () => {
  assert.equal(overlaps('2026-07-01', '2026-07-05', '2026-07-05', '2026-07-08'), false);
});
