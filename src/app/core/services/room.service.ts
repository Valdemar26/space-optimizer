import { Injectable } from '@angular/core';
import { IRoom, RoomStatus } from '../../features/models/room.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  rooms: IRoom[] = [
    { id: 1, name: 'Meeting Room A', type: 'Meeting', status: 'occupied' as RoomStatus },
    { id: 2, name: 'Open Space', type: 'Workspace', status: 'available' as RoomStatus },
    { id: 3, name: 'Conference Hall', type: 'Event', status: 'available' as RoomStatus },
    { id: 3, name: 'Meeting Room B', type: 'Meeting', status: 'occupied' as RoomStatus },
    { id: 3, name: 'Meeting Room C', type: 'Meeting', status: 'available' as RoomStatus },
  ];

  getRooms(): Observable<IRoom[]> {
    const mappedRooms = this.rooms.map((room) => ({
      ...room,
      status: room.status as RoomStatus,
    }));
    return of(mappedRooms);
  }

  addRoom(room: IRoom): Observable<IRoom> {
    this.rooms.push(room);
    return of(room);
  }
}
