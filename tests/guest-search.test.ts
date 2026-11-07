import { test } from 'node:test';
import assert from 'node:assert/strict';
import { searchGuests, type Guest } from '../src/modules/guests/search.ts';

const guests: Guest[] = [
  { id: 1, fullName: 'Олена Коваль', phone: '+38 (050) 123-45-67' },
  { id: 2, fullName: 'Андрій Мельник', phone: '0671112233' },
];

test('finds a guest by part of the name, ignoring case', () => {
  assert.deepEqual(searchGuests(guests, 'коваль').map((g) => g.id), [1]);
});

test('finds a guest by phone regardless of formatting', () => {
  assert.deepEqual(searchGuests(guests, '0501234567').map((g) => g.id), [1]);
});

test('an empty query returns nothing', () => {
  assert.deepEqual(searchGuests(guests, '  '), []);
});
