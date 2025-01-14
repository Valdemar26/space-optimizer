import { Injectable, Signal, signal, computed, effect } from '@angular/core';
import { IRoom } from '../../features/models/room.model';
import { from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { openDB } from 'idb';
import { catchError, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private roomsSignal = signal<IRoom[]>([]);
  private offlineRoomsSignal = signal<IRoom[]>([]);

  private dbPromise = openDB('rooms-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('rooms')) {
        db.createObjectStore('rooms', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  constructor(private http: HttpClient) {
    this.loadRooms().subscribe(); // Завантажуємо кімнати при ініціалізації
    window.addEventListener('online', () => this.syncRooms().subscribe());
  }

  get rooms(): Signal<IRoom[]> {
    return this.roomsSignal.asReadonly();
  }

  loadRooms(): Observable<IRoom[]> {
    return from(this.dbPromise).pipe(
      mergeMap((db) => db.getAll('rooms')),
      tap((rooms) => {
        this.roomsSignal.set(rooms);
        if (navigator.onLine) {
          this.http.get<IRoom[]>('/api/rooms').pipe(
            catchError((err) => {
              console.error('Failed to fetch rooms-11111:', err);
              return of([]);
            })
          ).subscribe((apiRooms) => {
            console.log('apiRooms: ', apiRooms);
            if (apiRooms.length > 0) {
              this.roomsSignal.set(apiRooms);
              this.syncDB(apiRooms); // Sync with IndexedDB
            }
          });
        }
      })
    );
  }

  addRoom(room: IRoom): Observable<IRoom> {
    if (navigator.onLine) {
      return this.http.post<IRoom>('/api/rooms', room).pipe(
        tap((newRoom) => {
          this.roomsSignal.update((rooms) => [...rooms, newRoom]);
          this.dbPromise.then((db) => db.add('rooms', newRoom));
        }),
        catchError((error) => {
          console.error('Error adding room to server:', error);
          this.saveOffline(room);
          return of(room);
        })
      );
    } else {
      this.saveOffline(room);
      return of(room);
    }
  }

  private saveOffline(room: IRoom): void {
    this.offlineRoomsSignal.update((rooms) => [...rooms, room]);
    this.dbPromise.then((db) => db.add('rooms', room));
  }

  deleteRoom(roomId: number): Observable<Object | void> {
    this.roomsSignal.update((rooms) => rooms.filter((room) => room.id !== roomId));

    const deleteFromDB = this.dbPromise.then((db) => {
      const tx = db.transaction('rooms', 'readwrite');
      tx.objectStore('rooms').delete(roomId);
      return tx.done;
    });

    if (navigator.onLine) {
      return from(this.http.delete(`/api/rooms/${roomId}`).pipe(
        tap(() => from(deleteFromDB))
      ));
    } else {
      return from(deleteFromDB);
    }
  }

  syncRooms(): Observable<IRoom | undefined> {
    return from(this.dbPromise).pipe(
      mergeMap((db) => db.getAll('rooms')),
      mergeMap((offlineRooms) =>
        from(offlineRooms).pipe(
          mergeMap((room) =>
            this.http.post<IRoom>('/api/rooms', room).pipe(
              tap(() =>
                this.offlineRoomsSignal.update((rooms) =>
                  rooms.filter((offlineRoom) => offlineRoom.id !== room.id)
                )
              ),
              catchError((error) => {
                console.error('Sync error:', error);
                return of(void 0);
              })
            )
          )
        )
      )
    );
  }

  private syncDB(rooms: IRoom[]) {
    this.dbPromise.then(async (db) => {
      const tx = db.transaction('rooms', 'readwrite');
      const store = tx.objectStore('rooms');
      await Promise.all(rooms.map((room) => store.put(room)));
      await tx.done;
    });
  }
}
