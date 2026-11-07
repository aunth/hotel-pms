export type RoomStatus = 'free' | 'occupied' | 'cleaning' | 'maintenance';

export interface Room {
  id: number;
  number: string;
  roomTypeId: number;
  status: RoomStatus;
}
