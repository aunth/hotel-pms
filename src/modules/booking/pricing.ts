import { nights } from '../../domain/booking.ts';

// Вартість проживання (F2, F5): кількість ночей помножена на тариф за ніч у гривнях.
// Тариф не може бути від'ємним; безкоштовне проживання (0) допустиме для службових броней.
export function stayCost(checkIn: string, checkOut: string, ratePerNight: number): number {
  if (!Number.isFinite(ratePerNight) || ratePerNight < 0) {
    throw new RangeError('Тариф має бути невід\'ємним числом');
  }
  return nights(checkIn, checkOut) * ratePerNight;
}
