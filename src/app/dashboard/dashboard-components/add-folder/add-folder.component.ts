import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddNewOptionDialogComponent } from '../add-new-option-dialog/add-new-option-dialog.component';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.scss',
})
export class AddFolderComponent implements OnInit {
  fileForm!: FormGroup;
  currentStep = 0;
  totalSteps = 3;

  courts: string[] = ['محكمة 1', 'محكمة 2', 'محكمة 3']; // Replace with actual court options
  judges: string[] = ['قاضي 1', 'قاضي 2', 'قاضي 3']; // Replace with actual judge options
  procedureTypes: string[] = ['إجراء 1', 'إجراء 2', 'إجراء 3']; // Replace with actual procedure types
  hours: string[] = [
    '09:00 صباحا',
    '10:00 صباحا',
    '11:00 صباحا',
    '12:00 صباحا',
    '13:00 زوالا',
    '14:00 زوالا',
    '15:00 زوالا',
    '16:00 زوالا',
    '17:00 زوالا',
  ]; // Add more hours as needed
  topics: string[] = ['ضرب وجرح', ' طلاق']; // Replace with actual topics

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddFolderComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fileForm = this.fb.group({
      fileNumber: ['', Validators.required],
      court: ['', Validators.required],
      judge: ['', Validators.required],
      procedureType: ['', Validators.required],
      parties: this.fb.array([]),
      preliminaryJudgment: [''],
      fees: [null, [Validators.required, Validators.min(0)]],
      expertiseDate: [null, Validators.required],
      propertyReference: ['عقار غير محفظ', Validators.required],
      expertReportSubmitted: [false],
      expenseSheetSubmitted: [false],
      accountNumber: [''],
      feesCollected: [false],
      lawyers: this.fb.array([]),
      time: ['', Validators.required],
      topic: ['', Validators.required],
    });
  }

  get parties() {
    return this.fileForm.get('parties') as FormArray;
  }

  get lawyers() {
    return this.fileForm.get('lawyers') as FormArray;
  }

  addParty() {
    const partyControl = this.fb.control('', Validators.required);
    this.parties.push(partyControl);
  }

  removeParty(index: number) {
    this.parties.removeAt(index);
  }

  addLawyer() {
    const lawyerControl = this.fb.control('', Validators.required);
    this.lawyers.push(lawyerControl);
  }

  removeLawyer(index: number) {
    this.lawyers.removeAt(index);
  }
  addNewOption(field: string) {
    let dialogConfig;
    switch (field) {
      case 'court':
        dialogConfig = {
          title: 'إضافة محكمة جديدة',
          fields: [
            {
              name: 'name',
              label: 'اسم المحكمة',
              validators: [Validators.required],
            },
            {
              name: 'city',
              label: 'المدينة',
              validators: [Validators.required],
            },
          ],
        };
        break;
      case 'judge':
        dialogConfig = {
          title: 'إضافة قاضي جديد',
          fields: [
            {
              name: 'name',
              label: 'الاسم الكامل للقاضي ',
              validators: [Validators.required],
            },
            { name: 'gender', label: ' صفة القاضي (استاذ / استاذة)' , type:"dropDown",list:['استاذ ','استاذة'],validators: [Validators.required]},
          ],
        };
        break;
      case 'procedureType':
        dialogConfig = {
          title: 'إضافة نوع إجراء جديد',
          fields: [
            {
              name: 'name',
              label: 'وصف الإجراء ',
              validators: [Validators.required],
              type:"dropDown",list:['تنازل ','تنفيذ']
            },
          ],
        };
        break;
      case 'topic':
        dialogConfig = {
          title: '   إضافة موضوع جديد',
          fields: [
            {
              name: 'name',
              label: 'وصف الموضوع  ',
              validators: [Validators.required],
              type:"dropDown",list:['نصب واحتيال']
            },
          ],
        };
        break;
      case 'parties':
        dialogConfig = {
          title: 'إضافة طرف ',
          fields: [
            { name: 'name', label: 'اسم الطرف', validators: [Validators.required] },
            { name: 'feature', label: 'صفة الطرف',validators: [Validators.required] ,type:"dropDown",list:['مدعي','مستأنف']},
           
          ]
        };
        break;
      case 'lawyer':
        dialogConfig = {
          title: 'إضافة محامي ',
          fields: [
            { name: 'name', label: 'اسم المحامي', validators: [Validators.required] },
            
            { name: 'authority', label: 'الهيئة',validators: [Validators.required] }
          ]
        };
        break;
      default:
        return;
    }
  
    const dialogRef = this.dialog.open(AddNewOptionDialogComponent, {
      width: '400px',
      data: dialogConfig,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
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
          case 'topic':
            this.topics.push(result.name);
            this.fileForm.get('topic')?.setValue(result.name);
            break;
          case 'parties':
            this.addParty();
            const lastPartyIndex = this.parties.length - 1;
            this.parties.at(lastPartyIndex).setValue(result.name);
            break;
          case 'lawyer':
            this.addLawyer();
            const lastLawyerIndex = this.lawyers.length - 1;
            this.lawyers.at(lastLawyerIndex).setValue(result.name);
            break;
        }
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