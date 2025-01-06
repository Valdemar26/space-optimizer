import { Injectable, Signal, signal } from '@angular/core';
import { IRoom } from '../../features/models/room.model';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private roomsSignal = signal<IRoom[]>([]);

  private dbPromise = openDB('rooms-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('rooms')) {
        db.createObjectStore('rooms', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  constructor(private http: HttpClient) {
    this.loadRooms();
  }

  get rooms(): Signal<IRoom[]> {
    return this.roomsSignal.asReadonly();
  }

// Завантаження кімнат з IndexedDB
  loadRooms(): Observable<IRoom[]> {
    return from(
      this.dbPromise.then((db) => db.getAll('rooms'))
    );
  }

  // Додавання кімнати
  addRoom(room: IRoom): Observable<IRoom> {
    return from(
      this.dbPromise.then(async (db) => {
        await db.add('rooms', room);
        return room; // Повертаємо кімнату після додавання
      })
    );
  }

  // Синхронізація кімнат з сервером
  syncRooms(): Observable<void> {
    return from(
      this.dbPromise.then(async (db) => {
        const offlineRooms = await db.getAll('rooms');

        for (const room of offlineRooms) {
          try {
            await this.http.post<IRoom>('http://localhost:3000/rooms', room).toPromise();
            await db.delete('rooms', room.id); // Видалення з IndexedDB після синхронізації
          } catch (error) {
            console.error('Синхронізація не вдалася:', error);
          }
        }
      })
    );
  }
}
