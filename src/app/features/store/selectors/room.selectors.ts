import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomState } from '../reducers/room.reducer';
import { IRoom } from '../../models/room.model';

export const selectRoomsFeature = createFeatureSelector<RoomState>('rooms');

export const selectAllRooms = createSelector(
  selectRoomsFeature,
  (state) => {
    console.log('state: ', state);
    return state.rooms
  }
);

export const selectOccupiedRooms = createSelector(selectAllRooms, (rooms: IRoom[]) =>
{
  console.log('selectOccupiedRooms: ', rooms);
  return rooms.filter((room: IRoom) => room.status === 'occupied')
}
);

export const selectFreeRooms = createSelector(selectAllRooms, (rooms: IRoom[]) =>
  rooms.filter((room: IRoom) => room.status === 'available')
);

