import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../core/services/room.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { IRoom, RoomStatus } from '../models/room.model';
import { Store } from '@ngrx/store';
import {addRoom, loadRooms} from '../store/actions/room.actions';
import { Observable } from 'rxjs';
import { selectAllRooms } from '../store/selectors/room.selectors';
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
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


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
    MatButton,
    MatIcon,
    NgIf
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  public rooms$!: Observable<IRoom[]>;

  displayedColumns: string[] = ['position', 'name', 'type', 'status'];
  public readonly RoomStatus = RoomStatus;

  constructor(
    private readonly store: Store,
    ) {
  }

  ngOnInit() {
    this.store.dispatch(loadRooms());
    this.rooms$ = this.store.select(selectAllRooms);
  }

  addNewRoom() {
    const newRoom: IRoom = { id: 7, name: 'Room 101', type: 'Deluxe', status: RoomStatus.AVAILABLE };
    this.store.dispatch(addRoom({ room: newRoom }));
  }

}
