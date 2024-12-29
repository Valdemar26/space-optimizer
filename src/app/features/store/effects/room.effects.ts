import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RoomService } from '../../../core/services/room.service';
import { loadRooms, loadRoomsFailure, loadRoomsSuccess } from '../actions/room.actions';

@Injectable()
export class RoomEffects {
  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      tap(action => console.log('Received action:', action)),
      ofType(loadRooms),
      mergeMap(() =>
        this.roomService.getRooms().pipe(
          tap(rooms => console.log('ROOMS: ', rooms)),
          map((rooms) => loadRoomsSuccess({ rooms })),
          catchError((error) => of(loadRoomsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private roomService: RoomService,
  ) {
    console.log('Actions:', this.actions$);
    console.log('RoomService:', this.roomService);
  }
}
