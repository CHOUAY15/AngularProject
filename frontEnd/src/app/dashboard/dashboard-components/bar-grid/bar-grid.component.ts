import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BarService } from 'src/app/core/service/bar.service';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

export interface Bar {
  id: number;
  name: string;
}

@Component({
  selector: 'app-bar-grid',
  templateUrl: './bar-grid.component.html',
  styleUrls: ['./bar-grid.component.scss']
})
export class BarGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Bar>;
  editingBar: Bar | null = null;
  barForm:FormGroup;
  editNameControl:FormControl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private barService: BarService,private fb: FormBuilder,   private dialog: MatDialog) {  // Inject the service
    this.dataSource = new MatTableDataSource<Bar>([]);
    this.barForm = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.editNameControl = new FormControl('', [Validators.required]);

  }

  ngOnInit() {
    this.loadBars();  // Load bars from API when component initializes
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

  // Load all bars from the API
  loadBars() {
    this.barService.getAllBars().subscribe(
      data => this.dataSource.data = data,
      error => console.error('Error fetching bars', error)
    );
  }

  // Add a new bar using the API
  addBar() {
    if (this.barForm.valid) {
      const newBar: Bar = {
        id: 0,
        name: this.barForm.get('name')?.value,
      };
      this.barService.createBar(newBar).subscribe(
        barCreated => {
          this.dataSource.data = [...this.dataSource.data, barCreated];
          this.barForm.reset();
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تمت الإضافة بنجاح',
              message: `تمت إضافة هيئة ${barCreated.name} بنجاح.`
            }
          });
        },
        error => console.error('Error creating bar', error)
      );
    }
  }

  // Edit an existing bar
  editBar(bar: Bar) {
    this.editingBar = { ...bar };
    this.editNameControl.setValue(bar.name);

  }

  // Update the bar using the API
  updateBar() {
    if (this.editingBar && this.editNameControl.valid) {
      const updatedBar: Bar = {
        ...this.editingBar,
        name: this.editNameControl.value,
      };
      this.barService.updateBar(updatedBar.id, updatedBar).subscribe(
        updatedBar => {
          const index = this.dataSource.data.findIndex(c => c.id === updatedBar.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedBar;
            this.dataSource.data = [...this.dataSource.data];
          }
          this.editingBar = null;
        },
        error => console.error('Error updating bar', error)
      );
    }
  }

  // Delete a bar using the API
  deleteBar(id: number,name:string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { dataProp: name,dataTitle:" الهيئة" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.barService.deleteBar(id).subscribe(
          response => {
            this.dataSource.data = this.dataSource.data.filter(bar => bar.id !== id);

            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة الهيئة ${name} بنجاح.`
              }
            });
          },
          error => { 

            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تنبيه  ',
                message: `هذا الهيئة مستخدم بالفعل في محامي لا يمكنك حذفه`
              }
            });
          }
        );
   
        
       
      }
    });
    
  }

  // Cancel edit
  cancelEdit() {
    this.editingBar = null;
  }

  // Check if a bar is being edited
  isEditing(bar: Bar): boolean {
    return this.editingBar !== null && this.editingBar.id === bar.id;
  }
}

