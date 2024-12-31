import { createReducer, on } from '@ngrx/store';
import { IRoom } from '../../models/room.model';
import { loadRoomsSuccess, addRoomSuccess } from '../actions/room.actions';

export interface RoomState {
  rooms: IRoom[];
}

export const initialState: RoomState = {
  rooms: [],
};

export const roomReducer = createReducer(
  initialState,
  on(loadRoomsSuccess, (state, { rooms }) => ({ ...state, rooms })),
  on(addRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: [...state.rooms, room],
  }))
);
