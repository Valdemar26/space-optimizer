import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  rooms = [
    { id: '1', name: 'Meeting Room A', type: 'Meeting', status: 'occupied' },
    { id: '2', name: 'Open Space', type: 'Workspace', status: 'available' },
    { id: '3', name: 'Conference Hall', type: 'Event', status: 'available' },
  ];

  getRooms() {
    return [...this.rooms];
  }
}
