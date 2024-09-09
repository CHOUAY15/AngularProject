import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CourtService } from 'src/app/core/service/court.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

interface Court {
  id: number;
  name: string;
  city: string;
}

@Component({
  selector: 'app-court-grid',
  templateUrl: './court-grid.component.html',
  styleUrls: ['./court-grid.component.scss']
})
export class CourtGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'city', 'actions'];
  dataSource: MatTableDataSource<Court>;
  courtForm: FormGroup;
  editingCourt: Court | null = null;
  editNameControl: FormControl;
  editCityControl: FormControl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private courtService: CourtService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Court>([]);
    this.courtForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]]
    });
    this.editNameControl = new FormControl('', [Validators.required, Validators.pattern(/^[^0-9]*$/)]);
    this.editCityControl = new FormControl('', [Validators.required, Validators.pattern(/^[^0-9]*$/)]);
  }

  ngOnInit() {
    this.loadCourts();
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
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} من ${length}`;
    };
  }

  loadCourts() {
    this.courtService.getAllCourts().subscribe(
      data => this.dataSource.data = data,
      error => console.error('Error fetching courts', error)
    );
  }

  addCourt() {
    if (this.courtForm.valid) {
      const newCourt: Court = {
        id: 0,
        name: this.courtForm.get('name')?.value,
        city: this.courtForm.get('city')?.value
      };
      this.courtService.createCourt(newCourt).subscribe(
        createdCourt => {
          this.dataSource.data = [...this.dataSource.data, createdCourt];
          this.courtForm.reset();
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تمت الإضافة بنجاح',
              message: `تمت إضافة المحكمة ${createdCourt.name} بنجاح.`
            }
          });
        },
        error => console.error('Error creating court', error)
      );
    }
  }

  editCourt(court: Court) {
    this.editingCourt = { ...court };
    this.editNameControl.setValue(court.name);
    this.editCityControl.setValue(court.city);
  }

  updateCourt() {
    if (this.editingCourt && this.editNameControl.valid && this.editCityControl.valid) {
      const updatedCourt: Court = {
        ...this.editingCourt,
        name: this.editNameControl.value,
        city: this.editCityControl.value
      };
      this.courtService.updateCourt(updatedCourt.id, updatedCourt).subscribe(
        updatedCourt => {
          const index = this.dataSource.data.findIndex(c => c.id === updatedCourt.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedCourt;
            this.dataSource.data = [...this.dataSource.data];
          }
          this.editingCourt = null;
        },
        error => console.error('Error updating court', error)
      );
    }
  }

  deleteCourt(id: number,name:string) {
    
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { dataProp: name,dataTitle:"المحكمة" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
   
        this.courtService.deleteCourt(id).subscribe(
          response => {
            console.log('hbiba dyali 9bl:',this.dataSource.data)
            this.dataSource.data = this.dataSource.data.filter(court => court.id !== id);
            console.log('hbiba dyali b3d:',this.dataSource.data)

            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة المحكمة ${name} بنجاح.`
              }
            });
    
    
          },
          error => { 

            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تنبيه  ',
                message: `هذه المحكمه مستخدمة بالفعل في ملف، لا يمكن حذفها`
              }
            });
          }
        );
       
      }
    });

    
  }

  cancelEdit() {
    this.editingCourt = null;
  }

  isEditing(court: Court): boolean {
    return this.editingCourt !== null && this.editingCourt.id === court.id;
  }
}