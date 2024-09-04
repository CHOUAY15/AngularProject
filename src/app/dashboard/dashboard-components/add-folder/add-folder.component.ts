import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.scss'
})
export class AddFolderComponent implements OnInit {
  fileForm!: FormGroup;
  currentStep = 0;
  totalSteps = 3;
  

  courts: string[] = ['محكمة 1', 'محكمة 2', 'محكمة 3']; // Replace with actual court options
  judges: string[] = ['قاضي 1', 'قاضي 2', 'قاضي 3']; // Replace with actual judge options
  procedureTypes: string[] = ['إجراء 1', 'إجراء 2', 'إجراء 3']; // Replace with actual procedure types
  parties: string[] = ['طرف 1', 'طرف 2', 'طرف 3']; // Replace with actual parties
  propertyReferences: string[] = ['مرجع 1', 'مرجع 2', 'مرجع 3']; // Replace with actual property references
  lawyers: string[] = ['محامي 1', 'محامي 2', 'محامي 3']; // Replace with actual lawyers
  hours: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']; // Add more hours as needed

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddFolderComponent>
  ) {}

  ngOnInit() {
    this.fileForm = this.fb.group({
      fileNumber: ['', Validators.required],
      court: ['', Validators.required],
      subject: ['', Validators.required],
      judge: ['', Validators.required],
      procedureType: ['', Validators.required],
      parties: ['', Validators.required],
      preliminaryJudgment: [''],
      fees: [null, [Validators.required, Validators.min(0)]],
      expertiseDate: [null, Validators.required],
      propertyReference: ['', Validators.required],
      expertReportSubmitted: [false],
      expenseSheetSubmitted: [false],
      accountNumber: [''],
      feesCollected: [false],
      lawyer: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.fileForm.valid) {
      this.dialogRef.close(this.fileForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    } else if (this.fileForm.valid) {
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
  }
