import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddNewOptionDialogComponent } from '../add-new-option-dialog/add-new-option-dialog.component';
import { FileService } from 'src/app/core/service/file.service';
import { OptionService } from 'src/app/core/service/option.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FolderRefreshService } from 'src/app/core/service/folder-refresh.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.scss',
})
export class AddFolderComponent implements OnInit {
  fileForm!: FormGroup;
  currentStep = 0;
  totalSteps = 3;
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
  ];

  courts: any[] = [];
  judges: any[] = [];
  procedureTypes: any[] = [];
  features: any[] = [];
  topics: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddFolderComponent>,
    private dialog: MatDialog,
    private fileService: FileService,
    private optionService: OptionService,
    private folderRefreshService: FolderRefreshService,
  ) {}

  ngOnInit() {
    this.fileForm = this.fb.group({
      fileNumber: ['', Validators.required],
      court: ['', Validators.required],
      judge: ['', Validators.required],
      procedureType: ['', Validators.required],
      parties: this.fb.array([]),
      preliminaryJudgment: [null, Validators.required],
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
    this.loadInitialData();
  }

  loadInitialData() {
    this.optionService.getAllCourts().subscribe(
      (data: any[]) => {
        this.courts = data;
      },
      (error) => {
        console.error('Error loading courts:', error);
      }
    );
    this.optionService.getAllJudges().subscribe(
      (data: any[]) => {
        this.judges = data;
      },
      (error) => {
        console.error('Error loading judges:', error);
      }
    );
    this.optionService.getAllTopics().subscribe(
      (data: any[]) => {
        this.topics = data;
      },
      (error) => {
        console.error('Error loading topics:', error);
      }
    );
    this.optionService.getAllActions().subscribe(
      (data: any[]) => {
        this.procedureTypes = data;
      },
      (error) => {
        console.error('Error loading actions:', error);
      }
    );
    this.optionService.getAllFeatures().subscribe(
      (data: any[]) => {
        console.log("lalalla",data)
        this.features = data;
        console.log("wewewe",this.features)
      },
      (error) => {
        console.error('Error loading features:', error);
      }
    );

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
      feature: ['', Validators.required],
    });
    this.parties.push(partyGroup);
  }

  removeParty(index: number) {
    this.parties.removeAt(index);
  }
  addLawyer() {
    const lawyerGroup = this.fb.group({
      fullName: ['', Validators.required],
      authority: ['', Validators.required],
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
              list: [{ description: 'استاذ ' }, { description: 'استاذة' }],
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
              list: this.features,
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
            console.log('mimi', result);
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
            console.log('wanassa',result)
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

      const fileData: any = {
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
          id:formData.topic.id,
          description: formData.topic.description,
        },
        actionType: {
          id:formData.procedureType.id,
          description: formData.procedureType.description,
        },
        court: {
          id:formData.court.id,
          city: formData.court.city,
          name: formData.court.name,
        },
        judge: {
          id:formData.judge.id,
          gender: formData.judge.gender,
          fullName: formData.judge.fullName,
        },
      };
      
      if (formData.parties && formData.parties.length > 0) {
        console.log('beliinghaaam',formData.parties)
        fileData.parties = formData.parties.map((party: any) => ({
          
          fullName: party.fullName,
          address: party.address,
          feature: {
            id:party.feature.id,
            description: party.feature.description,
          },
        }));
      }
      
      if (formData.lawyers && formData.lawyers.length > 0) {
        fileData.lawyers = formData.lawyers.map((lawyer: any) => ({
          fullName: lawyer.fullName,
          authority: lawyer.authority,
        }));
      }
      console.log('hbiba dyali ', fileData);
   

      this.fileService.createFile(fileData).subscribe(
        (response) => {
        this.folderRefreshService.triggerRefresh();
        this.dialogRef.close();
        this.dialog.open(SuccessDialogComponent, {
          width: '350px',
          data: {
             title: 'تمت الإضافة بنجاح',
              message: `تمت إضافة الملف  بنجاح.`
          }
        });
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
