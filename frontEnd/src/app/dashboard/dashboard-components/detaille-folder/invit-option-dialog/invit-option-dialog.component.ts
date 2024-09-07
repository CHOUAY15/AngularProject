import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invit-option-dialog',

  templateUrl: './invit-option-dialog.component.html',
  styleUrl: './invit-option-dialog.component.scss'
})
export class InvitOptionDialogComponent {

  constructor(public dialogRef: MatDialogRef<InvitOptionDialogComponent>) {}

  onOptionOne(): void {
    // Handle option one
    this.dialogRef.close('optionOne');
  }

  onOptionTwo(): void {
    // Handle option two
    this.dialogRef.close('optionTwo');
  }

}
