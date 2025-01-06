import { Injectable } from '@angular/core';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  constructor(private roomService: RoomService) {
    window.addEventListener('online', () => {
      this.syncRooms();
    });
  }

  syncRooms(): void {
    this.roomService.syncRooms().subscribe({
      next: () => console.log('Sync is finished'),
      error: (err) => console.error('Sync failed:', err),
    });
  }
}
