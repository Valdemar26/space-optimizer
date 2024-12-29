import { Injectable } from '@angular/core';
import { IRoom } from '../../features/models/room.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  rooms: IRoom[] = [
    { id: 1, name: 'Meeting Room A', type: 'Meeting', status: 'occupied' },
    { id: 2, name: 'Open Space', type: 'Workspace', status: 'available' },
    { id: 3, name: 'Conference Hall', type: 'Event', status: 'available' },
    { id: 3, name: 'Meeting Room B', type: 'Meeting', status: 'occupied' },
    { id: 3, name: 'Meeting Room C', type: 'Meeting', status: 'available' },
  ];

  getRooms(): Observable<IRoom[]> {
    return of([...this.rooms]);
  }
}
