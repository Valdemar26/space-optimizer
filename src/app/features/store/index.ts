import { ActionReducerMap } from '@ngrx/store';
import { roomReducer, RoomState } from './reducers/room.reducer';

export interface AppState {
  rooms: RoomState;
}

export const reducers: ActionReducerMap<AppState> = {
  rooms: roomReducer,
};
