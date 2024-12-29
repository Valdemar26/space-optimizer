import { createAction, props } from '@ngrx/store';
import { IRoom } from '../../models/room.model';

export const loadRooms = createAction('[Room] Load Rooms', props<{ room: IRoom }>());
export const loadRoomsSuccess = createAction('[Room] Load Rooms Success', props<{ rooms: IRoom[] }>());
export const loadRoomsFailure = createAction('[Room] Load Rooms Failure', props<{ error: any }>());

export const addRoom = createAction('[Room] Add Room', props<{ room: IRoom }>());
