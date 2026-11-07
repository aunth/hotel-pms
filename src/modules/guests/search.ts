export interface Guest {
  id: number;
  fullName: string;
  phone: string;
  email?: string;
}

const digits = (s: string) => s.replace(/\D/g, '');

// Пошук гостя за частиною імені або телефону (F4). Телефон порівнюється лише за цифрами,
// тому «+38 (050) 123-45-67» і «0501234567» знаходять одного й того самого гостя.
export function searchGuests(guests: Guest[], query: string): Guest[] {
  const q = query.trim().toLowerCase();
  if (q === '') return [];
  const qDigits = digits(q);
  return guests.filter(
    (g) => g.fullName.toLowerCase().includes(q) || (qDigits.length >= 4 && digits(g.phone).includes(qDigits)),
  );
}
