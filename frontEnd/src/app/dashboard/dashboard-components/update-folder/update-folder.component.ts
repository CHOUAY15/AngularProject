import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewOptionDialogComponent } from '../add-new-option-dialog/add-new-option-dialog.component';
import { FileService } from 'src/app/core/service/file.service';
import { OptionService } from 'src/app/core/service/option.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FolderRefreshService } from 'src/app/core/service/folder-refresh.service';
import { Folder } from 'src/app/shared/models/folder';

@Component({
  selector: 'app-update-folder',
  templateUrl: './update-folder.component.html',
  styleUrl: './update-folder.component.scss',
})
export class UpdateFolderComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public data: { folder: any },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateFolderComponent>,
    private dialog: MatDialog,
    private fileService: FileService,
    private optionService: OptionService,
    private folderRefreshService: FolderRefreshService,
  ) { }

  ngOnInit() {
    this.loadInitialData();
    console.log('Selected Court:', this.data.folder.court);
    console.log('Court List:', this.courts);

    this.fileForm = this.fb.group({
      fileNumber: [this.data.folder.fileNumber, Validators.required],
      court: [this.data.folder.court, Validators.required],
      judge: [this.data.folder.judge, Validators.required],
      procedureType: [this.data.folder.actionType, Validators.required],
      preliminaryJudgment: [this.data.folder.judgment, Validators.required],
      fees: [this.data.folder.fees, [Validators.required, Validators.min(0)]],
      expertiseDate: [this.data.folder.experienceDate, Validators.required],
      propertyReference: [this.data.folder.reference, Validators.required],
      expertReportSubmitted: [this.data.folder.depositExpertReport],
      expenseSheetSubmitted: [this.data.folder.depositExpenseSheet],
      accountNumber: [this.data.folder.accountNumber, Validators.required],
      feesCollected: [this.data.folder.feeCollection],
      time: [this.data.folder.hour, Validators.required],
      topic: [this.data.folder.topic, Validators.required],
    });

  }

  loadInitialData() {
    this.optionService.getAllCourts().subscribe(
      (data: any[]) => {
        this.courts = data;

        // After courts are fetched, patch the court value
        const selectedCourt = this.courts.find(court => court.id === this.data.folder.court.id);
        if (selectedCourt) {
          this.fileForm.patchValue({ court: selectedCourt });
        }
      },
      (error) => {
        console.error('Error loading courts:', error);
      }
    );

    // Fetch judges and patch judge field
    this.optionService.getAllJudges().subscribe(
      (data: any[]) => {
        this.judges = data;

        // After judges are fetched, patch the judge value
        const selectedJudge = this.judges.find(judge => judge.id === this.data.folder.judge.id);
        if (selectedJudge) {
          this.fileForm.patchValue({ judge: selectedJudge });
        }
      },
      (error) => {
        console.error('Error loading judges:', error);
      }
    );

    // Fetch topics and patch topic field
    this.optionService.getAllTopics().subscribe(
      (data: any[]) => {
        this.topics = data;

        // After topics are fetched, patch the topic value
        const selectedTopic = this.topics.find(topic => topic.id === this.data.folder.topic.id);
        if (selectedTopic) {
          this.fileForm.patchValue({ topic: selectedTopic });
        }
      },
      (error) => {
        console.error('Error loading topics:', error);
      }
    );

    // Fetch procedure types and patch procedureType field
    this.optionService.getAllActions().subscribe(
      (data: any[]) => {
        this.procedureTypes = data;

        // After procedure types are fetched, patch the procedureType value
        const selectedProcedureType = this.procedureTypes.find(type => type.id === this.data.folder.actionType.id);
        if (selectedProcedureType) {
          this.fileForm.patchValue({ procedureType: selectedProcedureType });
        }
      },
      (error) => {
        console.error('Error loading actions:', error);
      }
    );

    // Fetch features (no patching required since it's just being logged)
    this.optionService.getAllFeatures().subscribe(
      (data: any[]) => {
        console.log("Features loaded", data);
        this.features = data;
        console.log("Features stored", this.features);
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
            console.log('wanassa', result)
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
          id: formData.topic.id,
          description: formData.topic.description,
        },
        actionType: {
          id: formData.procedureType.id,
          description: formData.procedureType.description,
        },
        court: {
          id: formData.court.id,
          city: formData.court.city,
          name: formData.court.name,
        },
        judge: {
          id: formData.judge.id,
          gender: formData.judge.gender,
          fullName: formData.judge.fullName,
        },
      };

      console.log('hbiba dyali ', fileData);


      this.fileService.updateFile(fileData, this.data.folder.id).subscribe(
        (response) => {
          this.folderRefreshService.triggerRefresh();
          this.dialogRef.close();
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تم التعديل بنجاح',
              message: `تم تعديل الملف  بنجاح.`
            }
          });
          console.log('File updated successfully:', response);
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
