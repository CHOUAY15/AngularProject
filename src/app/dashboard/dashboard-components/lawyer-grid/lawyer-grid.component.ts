// lawyer-grid.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LawyerService } from 'src/app/core/service/lawyer.service';
import { Lawyer } from 'src/app/shared/models/folder';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-lawyer-grid',
  templateUrl: './lawyer-grid.component.html',
  styleUrls: ['./lawyer-grid.component.scss']
})
export class LawyerGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'authority', 'actions'];
  dataSource: MatTableDataSource<Lawyer>;
  editingLawyer: Lawyer | null = null;
  fileNum:any;
  lawyerForm:FormGroup;
  fileId:any;

  editFullNameControl:FormControl;
  editAuthorityControl:FormControl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route:ActivatedRoute,private lawyerService: LawyerService,    private fb: FormBuilder,  private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Lawyer>([]);
    this.lawyerForm=this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      authority:['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]]

    });
    this.editFullNameControl=new FormControl('', [Validators.required, Validators.pattern(/^[^0-9]*$/)]);
    this.editAuthorityControl=new FormControl('', [Validators.required, Validators.pattern(/^[^0-9]*$/)]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       this.fileNum = params.get('fileNum');
       this.fileId = params.get('id');

   
    });
    this.loadLawyers(this.fileId);
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

  loadLawyers(fileId:number) {
    this.lawyerService.getAllLawyersByFile(fileId).subscribe(
      data => this.dataSource.data = data,
      error => console.error('Error fetching lawyers', error)
    );
  }





  addLawyer() {
    if (this.lawyerForm.valid) {
      const newLawyer: Lawyer = {
        id: 0,
        fullName: this.lawyerForm.get('fullName')?.value,
        authority:this.lawyerForm.get('authority')?.value,
      };
      this.lawyerService.addLawyerToFile(newLawyer,this.fileId).subscribe(
        createdLawyer => {
          this.dataSource.data = [...this.dataSource.data, createdLawyer];
          this.lawyerForm.reset();

          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تمت الإضافة بنجاح',
              message: `تمت إضافة المحامي ${createdLawyer.fullName} بنجاح.`
            }
          });
        },
        error => console.error('Error creating lawyer', error)
      );
    }
  }

  editLawyer(lawyer: Lawyer) {
    this.editingLawyer = { ...lawyer };
    this.editFullNameControl.setValue(lawyer.fullName);
    this.editAuthorityControl.setValue(lawyer.authority);
  }

  updateLawyer() {
    if (this.editingLawyer && this.editFullNameControl.valid && this.editAuthorityControl.valid) {
      const updatedLawyer: Lawyer = {
        ...this.editingLawyer,
        fullName: this.editFullNameControl.value,
        authority: this.editAuthorityControl.value
      };
      this.lawyerService.updateLawyer(updatedLawyer.id, updatedLawyer).subscribe(
        updatedLawyer => {
          const index = this.dataSource.data.findIndex(c => c.id === updatedLawyer.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedLawyer;
            this.dataSource.data = [...this.dataSource.data];
          }
          this.editingLawyer = null;
        },
        error => console.error('Error updating lawyer', error)
      );
    }
  }

  deleteLawyer(id: number,name:string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { dataProp: name,dataTitle:"المحامي" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
   
        this.lawyerService.deleteLawyerFromFile(this.fileId,id).subscribe(
          response => {
            this.dataSource.data = this.dataSource.data.filter(lawyer => lawyer.id !== id);

            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة المحامي ${name} بنجاح.`
              }
            });
          },
          error => console.error('Error deleting lawyer', error)
        );
       
      }
    });  }

  cancelEdit() {
    this.editingLawyer = null;
  }

  isEditing(lawyer: Lawyer): boolean {
    return this.editingLawyer !== null && this.editingLawyer.id === lawyer.id;
  }
}