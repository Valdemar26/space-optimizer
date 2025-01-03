import { Injectable, Signal, signal } from '@angular/core';
import { IRoom, RoomStatus } from '../../features/models/room.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private roomsSignal = signal<IRoom[]>([]);

  constructor(private http: HttpClient) {
    this.loadRooms();
  }

  get rooms(): Signal<IRoom[]> {
    return this.roomsSignal.asReadonly();
  }

  public loadRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>('http://localhost:3000/rooms');
  }

  public addRoom(room: IRoom): Observable<IRoom> {
    return this.http.post<IRoom>('http://localhost:3000/rooms', room);
  }
}
