import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JudgeService } from 'src/app/core/service/judge.service'; 
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
export interface Judge {
  id: number;
  fullName: string;
  gender: string;
}


@Component({
  selector: 'app-judge-grid',
  templateUrl: './judge-grid.component.html',
  styleUrls: ['./judge-grid.component.scss']
})
export class JudgeGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'gender', 'actions'];
  dataSource: MatTableDataSource<Judge>;
  editingJudge: Judge | null = null;
  judgeForm:FormGroup;
  editFullNameControl:FormControl;
  editGenderControl:FormControl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private judgeService: JudgeService,    private fb: FormBuilder,  private dialog: MatDialog) {  // Inject the service
    this.dataSource = new MatTableDataSource<Judge>([]);
    this.judgeForm=this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      gender:['', [Validators.required]]

    });
    this.editFullNameControl=new FormControl('', [Validators.required, Validators.pattern(/^[^0-9]*$/)]);
    this.editGenderControl=new FormControl('', [Validators.required]);
  }

  ngOnInit() {
    this.loadJudges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'العناصر في الصفحة:';
    this.paginator._intl.nextPageLabel = 'الصفحة التالية';
    this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 من ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} من ${length}`;
    };
  }

  // Load judges from the API
  loadJudges() {
    this.judgeService.getAllJudges().subscribe(
      data => this.dataSource.data = data,
      error => console.error('Error fetching judges', error)
    );
  }

  addJudge() {

    if (this.judgeForm.valid) {
      const newJudge: Judge = {
        id: 0,
        fullName: this.judgeForm.get('fullName')?.value,
        gender:this.judgeForm.get('gender')?.value,
      };
      this.judgeService.createJudge(newJudge).subscribe(
        createdJudge => {
          this.dataSource.data = [...this.dataSource.data, createdJudge];
          this.judgeForm.reset();

          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تمت الإضافة بنجاح',
              message: `تمت إضافة القاضي ${createdJudge.fullName} بنجاح.`
            }
          });
        },
        error => console.error('Error creating judge', error)
      );
    }

    
  }

  editJudge(judge: Judge) {
    this.editingJudge = { ...judge };
    this.editFullNameControl.setValue(judge.fullName);
    this.editGenderControl.setValue(judge.gender);
  }

  updateJudge() {
    if (this.editingJudge && this.editFullNameControl.valid && this.editGenderControl.valid) {
      const updatedJudge: Judge = {
        ...this.editingJudge,
        fullName: this.editFullNameControl.value,
        gender: this.editGenderControl.value
      };
      this.judgeService.updateJudge(updatedJudge.id, updatedJudge).subscribe(
        updatedJudge => {
          const index = this.dataSource.data.findIndex(c => c.id === updatedJudge.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedJudge;
            this.dataSource.data = [...this.dataSource.data];
          }
          this.editingJudge = null;
        },
        error => console.error('Error updating judge', error)
      );
    }
  }

  deleteJudge(id: number,name:string) {
    
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { dataProp: name,dataTitle:"القاضي" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
   
        this.judgeService.deleteJudge(id).subscribe(
          response => {
            this.dataSource.data = this.dataSource.data.filter(judge => judge.id !== id);

            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة القاضي ${name} بنجاح.`
              }
            });
          },
          error => console.error('Error deleting judge', error)
        );
       
      }
    });

    
  }

  cancelEdit() {
    this.editingJudge = null;
  }

  isEditing(judge: Judge): boolean {
    return this.editingJudge !== null && this.editingJudge.id === judge.id;
  }
}
