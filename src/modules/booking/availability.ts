import { overlaps, type Booking } from '../../domain/booking.ts';
import type { Room } from '../../domain/room.ts';

// Номери, вільні на весь період [from, to). Скасовані й завершені броні не блокують номер,
// номери в ремонті не пропонуються взагалі.
export function findFreeRooms(rooms: Room[], bookings: Booking[], from: string, to: string): Room[] {
  const active = bookings.filter((b) => b.status === 'confirmed' || b.status === 'checked_in');
  return rooms.filter(
    (room) =>
      room.status !== 'maintenance' &&
      !active.some((b) => b.roomId === room.id && overlaps(b.checkIn, b.checkOut, from, to)),
  );
}
