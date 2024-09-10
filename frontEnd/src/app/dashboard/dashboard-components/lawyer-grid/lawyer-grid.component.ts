// lawyer-grid.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LawyerService } from 'src/app/core/service/lawyer.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { BarService } from 'src/app/core/service/bar.service';
import { AddNewOptionDialogComponent } from '../add-new-option-dialog/add-new-option-dialog.component';
import { OptionService } from 'src/app/core/service/option.service';

interface Bar {
  id: number;
  name: string;
}

interface Lawyer {
  id: number;
  fullName: string;
  bar: Bar;
}

@Component({
  selector: 'app-lawyer-grid',
  templateUrl: './lawyer-grid.component.html',
  styleUrls: ['./lawyer-grid.component.scss']
})
export class LawyerGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'bar', 'actions'];
  dataSource: MatTableDataSource<Lawyer>;
  editingLawyer: Lawyer | null = null;
  fileNum:any;
  lawyerForm:FormGroup;
  fileId:any;

  editFullNameControl:FormControl;
  editBarControl:FormControl;

  bars: Bar[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route:ActivatedRoute,private lawyerService: LawyerService,private fb: FormBuilder,  private dialog: MatDialog, private barService: BarService, private optionService: OptionService,) {
    this.dataSource = new MatTableDataSource<Lawyer>([]);
    this.lawyerForm=this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      bar:['', [Validators.required]]

    });
    this.editFullNameControl=new FormControl('', [Validators.required, Validators.pattern(/^[^0-9]*$/)]);
    this.editBarControl=new FormControl('', [Validators.required]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       this.fileNum = params.get('fileNum');
       this.fileId = params.get('id');

   
    });
    this.loadLawyers(this.fileId);
    this.loadBars();
  }

  loadBars() {
    this.barService.getAllBars().subscribe(
      data => this.bars = data,
      error => console.error('Error fetching features', error)
    );
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
        bar:this.lawyerForm.get('bar')?.value,
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
    this.editBarControl.setValue(lawyer.bar);
  }

  updateLawyer() {
    if (this.editingLawyer && this.editFullNameControl.valid && this.editBarControl.valid) {
      const updatedLawyer: Lawyer = {
        ...this.editingLawyer,
        fullName: this.editFullNameControl.value,
        bar: this.editBarControl.value
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

  addNewOption(field: string) {
    let dialogConfig;
    switch (field) {
      case 'bar':
        dialogConfig = {
          title: 'إضافة هيئة جديدة',
          fields: [
            {
              name: 'name',
              label: ' إسم الهيئة ',
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
          
          case 'bar':
            this.optionService.addBar(result).subscribe(
              (response: any) => {
                this.bars.push(response);
                this.lawyerForm.get('bar')?.setValue(response);
              },
              (error: any) => {
                console.error('Error adding action:', error);
              }
            );
            break;
        }
      }
    });
  }
}