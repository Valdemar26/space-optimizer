export enum RoomStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
}

export interface IRoom {
  id: number,
  name: string,
  type: string,
  status: RoomStatus
}
