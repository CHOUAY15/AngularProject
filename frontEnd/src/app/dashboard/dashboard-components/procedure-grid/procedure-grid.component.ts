import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActionTypeService } from 'src/app/core/service/action-type.service';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

export interface ProcedureType {
  id: number;
  description: string;
}

@Component({
  selector: 'app-procedure-grid',
  templateUrl: './procedure-grid.component.html',
  styleUrls: ['./procedure-grid.component.scss'],
})
export class ProcedureGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'actions'];
  dataSource: MatTableDataSource<ProcedureType>;
  editingProcedure: ProcedureType | null = null;
  procedureForm: FormGroup;
  editDescriptionControl: FormControl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private actionTypeService: ActionTypeService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    // Inject the service
    this.dataSource = new MatTableDataSource<ProcedureType>([]);
    this.procedureForm = this.fb.group({
      description: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
    });
    this.editDescriptionControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^0-9]*$/),
    ]);
  }

  ngOnInit() {
    this.loadProcedures(); // Load procedures from API when component initializes
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'العناصر في الصفحة:';
    this.paginator._intl.nextPageLabel = 'الصفحة التالية';
    this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length === 0 || pageSize === 0) {
        return `0 من ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} من ${length}`;
    };
  }

  // Load all procedures from the API
  loadProcedures() {
    this.actionTypeService.getAllActionTypes().subscribe(
      (data) => (this.dataSource.data = data),
      (error) => console.error('Error fetching procedures', error)
    );
  }

  // Add a new procedure using the API
  addProcedure() {
    if (this.procedureForm.valid) {
      const newAction: ProcedureType = {
        id: 0,
        description: this.procedureForm.get('description')?.value,
      };
      this.actionTypeService.createActionType(newAction).subscribe(
        (createdAction) => {
          this.dataSource.data = [...this.dataSource.data, createdAction];
          this.procedureForm.reset();
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تمت الإضافة بنجاح',
              message: `تمت إضافة الإجراء ${createdAction.description} بنجاح.`
            }
          });
          
        },
        (error) => console.error('Error creating action', error)
      );
    }
  }

  // Edit an existing procedure
  editProcedure(procedure: ProcedureType) {
    this.editingProcedure = { ...procedure };
    this.editDescriptionControl.setValue(procedure.description);
  }

  // Update the procedure using the API
  updateProcedure() {
    if (this.editingProcedure && this.editDescriptionControl.valid) {
      const updatedAction: ProcedureType = {
        ...this.editingProcedure,
        description: this.editDescriptionControl.value,
      };
      this.actionTypeService
        .updateActionType(updatedAction.id, updatedAction)
        .subscribe(
          (updatedAction) => {
            const index = this.dataSource.data.findIndex(
              (c) => c.id === updatedAction.id
            );
            if (index !== -1) {
              this.dataSource.data[index] = updatedAction;
              this.dataSource.data = [...this.dataSource.data];
            }
            this.editingProcedure = null;
          },
          (error) => console.error('Error updating action', error)
        );
    }
  }

  // Delete a procedure using the API
  deleteProcedure(id: number, name: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { dataProp: name, dataTitle: 'الإجراء' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.actionTypeService.deleteActionType(id).subscribe(
          (response) => {
            this.dataSource.data = this.dataSource.data.filter(
              (procedure) => procedure.id !== id
            );

            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة الإجراء ${name} بنجاح.`
              }
            });
          },
          (error) => console.error('Error deleting procedure', error)
        );
      }
    });
  }

  // Cancel edit
  cancelEdit() {
    this.editingProcedure = null;
  }

  // Check if a procedure is being edited
  isEditing(procedure: ProcedureType): boolean {
    return (
      this.editingProcedure !== null &&
      this.editingProcedure.id === procedure.id
    );
  }
}
