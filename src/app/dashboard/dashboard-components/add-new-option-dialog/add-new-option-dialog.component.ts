import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-option-dialog',

  templateUrl: './add-new-option-dialog.component.html',
  styleUrl: './add-new-option-dialog.component.scss'
})
export class AddNewOptionDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string, 
      fields: {name: string, label: string, type?: string,list?:any[], validators?: any[]}[]
    },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
    this.data.fields.forEach(field => {
      this.form.addControl(field.name, this.fb.control('', field.validators || []));
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}