import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IRoom, RoomStatus } from '../models/room.model';
import { Store } from '@ngrx/store';
import { addRoom, loadRooms } from '../store/actions/room.actions';
import { Observable } from 'rxjs';
import { selectAllRooms } from '../store/selectors/room.selectors';
import { AddRoomDialogComponent } from '../add-room-dialog/add-room-dialog.component';

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
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  public rooms$!: Observable<IRoom[]>;

  public displayedColumns: string[] = ['position', 'name', 'type', 'status'];
  public readonly RoomStatus = RoomStatus;

  constructor(
    private readonly store: Store,
    private dialog: MatDialog,
    ) {
  }

  ngOnInit() {
    this.store.dispatch(loadRooms());
    this.rooms$ = this.store.select(selectAllRooms);
  }

  public openAddRoomDialog(): void {
    const dialogRef = this.dialog.open(AddRoomDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: IRoom | undefined) => {
      if (result) {
        this.store.dispatch(addRoom({ room: result }));
      }
    });
  }

}
