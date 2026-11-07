import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findFreeRooms } from '../src/modules/booking/availability.ts';
import type { Room } from '../src/domain/room.ts';
import type { Booking } from '../src/domain/booking.ts';

const rooms: Room[] = [
  { id: 1, number: '101', roomTypeId: 1, status: 'free' },
  { id: 2, number: '102', roomTypeId: 1, status: 'free' },
  { id: 3, number: '103', roomTypeId: 2, status: 'maintenance' },
];

test('a booked room is not offered for overlapping dates', () => {
  const bookings: Booking[] = [{ id: 1, roomId: 1, checkIn: '2026-07-01', checkOut: '2026-07-05', status: 'confirmed' }];
  const free = findFreeRooms(rooms, bookings, '2026-07-03', '2026-07-06');
  assert.deepEqual(free.map((r) => r.number), ['102']);
});

test('a room is free again on the check-out day', () => {
  const bookings: Booking[] = [{ id: 1, roomId: 1, checkIn: '2026-07-01', checkOut: '2026-07-05', status: 'checked_in' }];
  const free = findFreeRooms(rooms, bookings, '2026-07-05', '2026-07-07');
  assert.deepEqual(free.map((r) => r.number), ['101', '102']);
});

test('cancelled bookings do not block a room', () => {
  const bookings: Booking[] = [{ id: 1, roomId: 1, checkIn: '2026-07-01', checkOut: '2026-07-05', status: 'cancelled' }];
  const free = findFreeRooms(rooms, bookings, '2026-07-02', '2026-07-04');
  assert.deepEqual(free.map((r) => r.number), ['101', '102']);
});

test('rooms under maintenance are never offered', () => {
  const free = findFreeRooms(rooms, [], '2026-07-02', '2026-07-04');
  assert.equal(free.some((r) => r.number === '103'), false);
});
