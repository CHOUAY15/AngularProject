import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddNewOptionDialogComponent } from '../add-new-option-dialog/add-new-option-dialog.component';

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
    public dialogRef: MatDialogRef<AddFolderComponent>,
    private dialog: MatDialog
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

  addNewOption(field: string) {
    let dialogConfig;
    switch (field) {
      case 'court':
        dialogConfig = {
          title: 'إضافة محكمة جديدة',
          fields: [
            { name: 'name', label: 'اسم المحكمة', validators: [Validators.required] },
            { name: 'location', label: 'الموقع', validators: [Validators.required] }
          ]
        };
        break;
      case 'judge':
        dialogConfig = {
          title: 'إضافة قاضي جديد',
          fields: [
            { name: 'name', label: 'اسم القاضي', validators: [Validators.required] },
            { name: 'specialization', label: 'التخصص' }
          ]
        };
        break;
      case 'procedureType':
        dialogConfig = {
          title: 'إضافة نوع إجراء جديد',
          fields: [
            { name: 'name', label: 'اسم الإجراء', validators: [Validators.required] },
            { name: 'description', label: 'الوصف' }
          ]
        };
        break;
      case 'parties':
        dialogConfig = {
          title: 'إضافة طرف جديد',
          fields: [
            { name: 'name', label: 'اسم الطرف', validators: [Validators.required] },
            { name: 'type', label: 'نوع الطرف' },
            { name: 'contact', label: 'معلومات الاتصال' }
          ]
        };
        break;
      case 'propertyReference':
        dialogConfig = {
          title: 'إضافة مرجع عقاري جديد',
          fields: [
            { name: 'reference', label: 'المرجع', validators: [Validators.required] },
            { name: 'address', label: 'العنوان' },
            { name: 'area', label: 'المساحة', type: 'number' }
          ]
        };
        break;
      case 'lawyer':
        dialogConfig = {
          title: 'إضافة محامي جديد',
          fields: [
            { name: 'name', label: 'اسم المحامي', validators: [Validators.required] },
            { name: 'barNumber', label: 'رقم المحاماة' },
            { name: 'specialization', label: 'التخصص' }
          ]
        };
        break;
      default:
        return;
    }

    const dialogRef = this.dialog.open(AddNewOptionDialogComponent, {
      width: '400px',
      data: dialogConfig
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (field) {
          case 'court':
            this.courts.push(result.name);
            this.fileForm.get('court')?.setValue(result.name);
            break;
          case 'judge':
            this.judges.push(result.name);
            this.fileForm.get('judge')?.setValue(result.name);
            break;
          case 'procedureType':
            this.procedureTypes.push(result.name);
            this.fileForm.get('procedureType')?.setValue(result.name);
            break;
          case 'parties':
            this.parties.push(result.name);
            const currentParties = this.fileForm.get('parties')?.value || [];
            this.fileForm.get('parties')?.setValue([...currentParties, result.name]);
            break;
          case 'propertyReference':
            this.propertyReferences.push(result.reference);
            this.fileForm.get('propertyReference')?.setValue(result.reference);
            break;
          case 'lawyer':
            this.lawyers.push(result.name);
            this.fileForm.get('lawyer')?.setValue(result.name);
            break;
        }
        // You might want to save the full result object to your backend or local storage
        console.log('New option added:', result);
      }
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
