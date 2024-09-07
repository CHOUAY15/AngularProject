import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Folder } from 'src/app/shared/models/folder';
@Component({
  selector: 'app-update-folder',

  templateUrl: './update-folder.component.html',
  styleUrl: './update-folder.component.scss'
})
export class UpdateFolderComponent implements OnInit {
  folderForm: FormGroup;
  currentStep = 0;
  totalSteps = 3;

  courts: string[] = ['محكمة 1', 'محكمة 2', 'محكمة 3'];
  topics: string[] = ['موضوع 1', 'موضوع 2', 'موضوع 3'];
  judges: string[] = ['قاضي 1', 'قاضي 2', 'قاضي 3'];
  procedureTypes: string[] = ['نوع 1', 'نوع 2', 'نوع 3'];
  hours: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { folder: Folder }
  ) {
    this.folderForm = this.fb.group({
      fileNumber: [data.folder.fileNumber, Validators.required],
      court: [data.folder.court, Validators.required],
      topic: [data.folder.topic, Validators.required],
      judge: [data.folder.judge, Validators.required],
      procedureType: [data.folder.procedureType, Validators.required],
      preliminaryJudgment: [data.folder.preliminaryJudgment],
      fees: [data.folder.fees, Validators.required],
      expertiseDate: [data.folder.expertiseDate, Validators.required],
      propertyReference: [data.folder.propertyReference, Validators.required],
      expertReportSubmitted: [data.folder.expertReportSubmitted],
      expenseSheetSubmitted: [data.folder.expenseSheetSubmitted],
      accountNumber: [data.folder.accountNumber],
      feesCollected: [data.folder.feesCollected],
      time: [data.folder.time, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    } else if (this.folderForm.valid) {
      this.onSubmit();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    if (step >= 0 && step < this.totalSteps) {
      this.currentStep = step;
    }
  }

  isLastStep(): boolean {
    return this.currentStep === this.totalSteps - 1;
  }

  onSubmit() {
    if (this.folderForm.valid) {
      this.dialogRef.close(this.folderForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  addNewOption(field: string) {
    // Implement logic to add new option
  }
}