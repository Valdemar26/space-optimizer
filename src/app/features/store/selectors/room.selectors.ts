import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomState } from '../reducers/room.reducer';
import { IRoom, RoomStatus } from '../../models/room.model';

export const selectRoomsFeature = createFeatureSelector<RoomState>('rooms');

export const selectAllRooms = createSelector(
  selectRoomsFeature,
  (state) => state.rooms
);

export const selectOccupiedRooms = createSelector(selectAllRooms, (rooms: IRoom[]) =>
  rooms.filter((room: IRoom) => room.status === RoomStatus.OCCUPIED)
);

export const selectFreeRooms = createSelector(selectAllRooms, (rooms: IRoom[]) =>
  rooms.filter((room: IRoom) => room.status === RoomStatus.AVAILABLE)
);

