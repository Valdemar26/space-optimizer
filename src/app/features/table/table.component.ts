import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../core/services/room.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { IRoom } from '../models/room.model';
import { Store } from '@ngrx/store';
import {addRoom, loadRooms} from '../store/actions/room.actions';
import { Observable } from 'rxjs';
import {selectOccupiedRooms} from '../store/selectors/room.selectors';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatButton
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  public rooms$!: Observable<IRoom[]>;

  displayedColumns: string[] = ['position', 'name', 'type', 'status'];

  constructor(
    private readonly roomService: RoomService,
    private readonly store: Store,
    ) {
  }

  ngOnInit() {
    this.rooms$ = this.roomService.getRooms();
  }

  addNewRoom() {
    const newRoom: IRoom = { id: 7, name: 'Room 101', type: 'Deluxe', status: 'Free' };
    this.store.dispatch(addRoom({ room: newRoom }));

    this.store.dispatch(loadRooms({ room: newRoom }));
  }

}
