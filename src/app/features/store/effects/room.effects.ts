import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RoomService } from '../../../core/services/room.service';
import {
  addRoom,
  addRoomFailure,
  addRoomSuccess,
  loadRooms,
  loadRoomsFailure,
  loadRoomsSuccess
} from '../actions/room.actions';
import { IRoom } from '../../models/room.model';

@Injectable()
export class RoomEffects {
  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRooms),
      mergeMap(() =>
        this.roomService.getRooms().pipe(
          map((rooms: IRoom[]) => loadRoomsSuccess({ rooms })),
          catchError((error) => of(loadRoomsFailure({ error })))
        )
      )
    )
  );

  addRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRoom),
      mergeMap(({ room }) =>
        this.roomService.addRoom(room).pipe(
          map((addedRoom: IRoom) => addRoomSuccess({ room: addedRoom })),
          catchError((error) => of(addRoomFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private roomService: RoomService,
  ) {}
}
