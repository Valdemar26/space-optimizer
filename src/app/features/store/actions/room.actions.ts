import { createAction, props } from '@ngrx/store';
import { IRoom } from '../../models/room.model';

export const loadRooms = createAction('[Room] Load Rooms');
export const loadRoomsSuccess = createAction('[Room] Load Rooms Success', props<{ rooms: IRoom[] }>());
export const loadRoomsFailure = createAction('[Room] Load Rooms Failure', props<{ error: any }>());

export const addRoom = createAction('[Room] Add Room', props<{ room: IRoom }>());
export const addRoomSuccess = createAction('[Room] Add Room Success', props<{ room: IRoom }>());
export const addRoomFailure = createAction('[Room] Add Room Failure', props<{ error: any }>());
