import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddNewOptionDialogComponent } from '../add-new-option-dialog/add-new-option-dialog.component';
import { FileService } from 'src/app/core/service/file.service';
import { OptionService } from 'src/app/core/service/option.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.scss',
})
export class AddFolderComponent implements OnInit {
  fileForm!: FormGroup;
  currentStep = 0;
  totalSteps = 3;

  courts: any[]=[{
    city: "الدار البيضاء",
    name: "محكمة الدرجة الأولى"
  }
  ] ; // Replace with actual court options
  judges: any[]=[{
 
    gender: "استاذ",
    fullName: "أحمد بن عبد الله"
  }
  ] ; // Replace with actual judge options
  procedureTypes: any[]=[{
  
  description: "استئناف"
  }
  ] ;// Replace with actual procedure types
  hours: any[] = [
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
  topics: any[]=[{
 
    description: "قانون الأسرة"
  }]; // Replace with actual topics

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddFolderComponent>,
    private dialog: MatDialog,
    private fileService: FileService,
    private optionService: OptionService
  ) {}

  ngOnInit() {
    this.fileForm = this.fb.group({
      fileNumber: ['', Validators.required],
      court: ['', Validators.required],
      judge: ['', Validators.required],
      procedureType: ['', Validators.required],
      parties: this.fb.array([]),
      preliminaryJudgment: ['', Validators.required],
      fees: [null, [Validators.required, Validators.min(0)]],
      expertiseDate: [null, Validators.required],
      propertyReference: ['عقار غير محفظ', Validators.required],
      expertReportSubmitted: [false],
      expenseSheetSubmitted: [false],
      accountNumber: ['', Validators.required],
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
    const partyGroup = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      feature: ['', Validators.required]
    });
    this.parties.push(partyGroup);
  }

  removeParty(index: number) {
    this.parties.removeAt(index);
  }
  addLawyer() {
    const lawyerGroup = this.fb.group({
      fullName: ['', Validators.required],
      authority: ['', Validators.required]
    });
    this.lawyers.push(lawyerGroup);
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
              name: 'fullName',
              label: 'الاسم الكامل للقاضي ',
              validators: [Validators.required],
            },
            {
              name: 'gender',
              label: ' صفة القاضي (استاذ / استاذة)',
              type: 'dropDown',
              list: ['استاذ ', 'استاذة'],
              validators: [Validators.required],
            },
          ],
        };
        break;
      case 'procedureType':
        dialogConfig = {
          title: 'إضافة نوع إجراء جديد',
          fields: [
            {
              name: 'description',
              label: 'وصف الإجراء ',
              validators: [Validators.required],
              type: 'dropDown',
              list: ['تنازل ', 'تنفيذ'],
            },
          ],
        };
        break;
      case 'topic':
        dialogConfig = {
          title: '   إضافة موضوع جديد',
          fields: [
            {
              name: 'description',
              label: 'وصف الموضوع  ',
              validators: [Validators.required],
              type: 'dropDown',
              list: ['نصب واحتيال'],
            },
          ],
        };
        break;
      case 'parties':
        dialogConfig = {
          title: 'إضافة طرف ',
          fields: [
            {
              name: 'fullName',
              label: 'اسم الطرف',
              validators: [Validators.required],
            },
            {
              name: 'address',
              label: ' عنوان الطرف',
              validators: [Validators.required],
            },
            {
              name: 'feature',
              label: 'صفة الطرف',
              validators: [Validators.required],
              type: 'dropDown',
              list: ['مدعي', 'مستأنف'],
            },
          ],
        };
        break;
      case 'lawyer':
        dialogConfig = {
          title: 'إضافة محامي ',
          fields: [
            {
              name: 'fullName',
              label: 'اسم المحامي',
              validators: [Validators.required],
            },

            {
              name: 'authority',
              label: 'الهيئة',
              validators: [Validators.required],
            },
          ],
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
            console.log('mimi',result)
            this.optionService.addCourt(result).subscribe(
              (response: any) => {
                this.courts.push(response); 
                this.fileForm.get('court')?.setValue(response);
              },
              (error: any) => {
                console.error('Error adding court:', error);
              }
            );
            break;
          case 'judge':
            this.optionService.addJudge(result).subscribe(
              (response: any) => {
                this.judges.push(response);
                this.fileForm.get('judge')?.setValue(response);
              },
              (error: any) => {
                console.error('Error adding judge:', error);
              }
            );
            break;
          case 'procedureType':
            this.optionService.addAction(result).subscribe(
              (response: any) => {
                this.procedureTypes.push(response);
                this.fileForm.get('procedureType')?.setValue(response);
              },
              (error: any) => {
                console.error('Error adding action:', error);
              }
            );
            break;
          case 'topic':
            this.optionService.addTopic(result).subscribe(
              (response: any) => {
                this.topics.push(response);
                this.fileForm.get('topic')?.setValue(response);
              },
              (error: any) => {
                console.error('Error adding topic:', error);
              }
            );
            break;
            case 'parties':
              this.addParty();
              const lastPartyIndex = this.parties.length - 1;
              this.parties.at(lastPartyIndex).patchValue(result);
              break;
            case 'lawyer':
              this.addLawyer();
              const lastLawyerIndex = this.lawyers.length - 1;
              this.lawyers.at(lastLawyerIndex).patchValue(result);
              break;
        }
      }
    });
  }

  onSubmit(): void {
    if (this.fileForm.valid) {
      const formData = this.fileForm.value;

      const fileData = {
        fileNumber: formData.fileNumber,
        judgment: formData.preliminaryJudgment,
        fees: formData.fees,
        experienceDate: formData.expertiseDate,
        reference: formData.propertyReference,
        depositExpertReport: formData.expertReportSubmitted,
        depositExpenseSheet: formData.expenseSheetSubmitted,
        accountNumber: formData.accountNumber,
        feeCollection: formData.feesCollected,
        hour: formData.time,
        topic: {
          description: formData.topic.description,
        },
        actionType: {
          description: formData.procedureType.description,
        },
        court: {
          city: formData.court.city, 
          name: formData.court.name,
        },
        judge: {
          gender: formData.judge.gender, 
          fullName: formData.judge.fullName,
        },
        parties: formData.parties.map((party: any) => ({
          fullName: party.fullName,
          address: party.address,
          feature: {
            description: party.feature,
          },
        })),
        lawyers: formData.lawyers.map((lawyer: any) => ({
          fullName: lawyer.fullName,
          authority: lawyer.authority,
        })),
      };
      console.log('hbiba dyali ', fileData);
      console.log('zin dyali ', formData.parties);
      console.log('zin dyali2 ', formData.lawyers);

      this.fileService.createFile(fileData).subscribe(
        (response) => {
          console.log('File created successfully:', response);
        },
        (error) => {
          console.error('Error creating file:', error);
        }
      );
    } else {
      console.error('Form is not valid');
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
