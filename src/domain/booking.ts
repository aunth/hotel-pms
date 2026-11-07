export type BookingStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

// Дати у форматі YYYY-MM-DD; день виїзду не входить у проживання
export interface Booking {
  id: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function nights(checkIn: string, checkOut: string): number {
  const diff = (Date.parse(checkOut) - Date.parse(checkIn)) / DAY_MS;
  if (!Number.isInteger(diff) || diff <= 0) {
    throw new RangeError('Дата виїзду має бути пізніше за дату заїзду');
  }
  return diff;
}

// Два періоди перетинаються, якщо кожен починається раніше, ніж закінчується інший.
// Виїзд і заїзд в один день не є перетином.
export function overlaps(aIn: string, aOut: string, bIn: string, bOut: string): boolean {
  return aIn < bOut && bIn < aOut;
}
