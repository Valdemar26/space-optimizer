import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {RoomStatus} from '../models/room.model';

@Component({
  selector: 'app-add-room-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatInput,
    NgIf,
    NgForOf,
    MatButton,
  ],
  templateUrl: './add-room-dialog.component.html',
  styleUrl: './add-room-dialog.component.scss'
})
export class AddRoomDialogComponent {
  public roomForm: FormGroup;

  public roomTypes: string[] = ['Deluxe', 'Standard', 'Suite'];
  public roomStatuses: string[] = [RoomStatus.AVAILABLE, RoomStatus.OCCUPIED];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.roomForm.valid) {
      this.dialogRef.close(this.roomForm.value);
    }
  }
}
