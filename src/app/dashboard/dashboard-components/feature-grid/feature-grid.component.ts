import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Feature } from 'src/app/shared/models/folder';
import { FeatureService } from 'src/app/core/service/feature.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-feature-grid',
  templateUrl: './feature-grid.component.html',
  styleUrls: ['./feature-grid.component.scss']
})
export class FeatureGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'actions'];
  dataSource: MatTableDataSource<Feature>;
  editingFeature: Feature | null = null;
  featureForm:FormGroup;
  editDescriptionControl:FormControl;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private featureService: FeatureService,private fb: FormBuilder,private dialog: MatDialog) {  // Inject the service
    this.dataSource = new MatTableDataSource<Feature>([]);
    this.featureForm = this.fb.group({
      description: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
    });
    this.editDescriptionControl = new FormControl('', [Validators.required, Validators.pattern(/^[^0-9]*$/)]);

  }

  ngOnInit() {
    this.loadFeatures();  // Load features from the API on init
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

  // Load all features from the API
  loadFeatures() {
    this.featureService.getAllFeatures().subscribe(
      data => this.dataSource.data = data,
      error => console.error('Error fetching features', error)
    );
  }

  // Add a new feature using the API
  addFeature() {
    if (this.featureForm.valid) {
      const newFeature: Feature = {
        id: 0,
        description: this.featureForm.get('description')?.value,
      };
      this.featureService.createFeature(newFeature).subscribe(
        createdFeature => {
          this.dataSource.data = [...this.dataSource.data, createdFeature];
          this.featureForm.reset();
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تمت الإضافة بنجاح',
              message: `تمت إضافة الصفة ${createdFeature.description} بنجاح.`
            }
          });
        },
        error => console.error('Error creating feature', error)
      );
    }
  }

  // Edit an existing feature
  editFeature(feature: Feature) {
    this.editingFeature = { ...feature };
    this.editDescriptionControl.setValue(feature.description);

  }

  // Update the feature using the API
  updateFeature() {
    if (this.editingFeature && this.editDescriptionControl.valid) {
      const updatedFeature: Feature = {
        ...this.editingFeature,
        description: this.editDescriptionControl.value,
      };
      this.featureService.updateFeature(updatedFeature.id, updatedFeature).subscribe(
        updatedFeature => {
          const index = this.dataSource.data.findIndex(c => c.id === updatedFeature.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedFeature;
            this.dataSource.data = [...this.dataSource.data];
          }
          this.editingFeature = null;
        },
        error => console.error('Error updating feature', error)
      );
    }
  }

  // Delete a feature using the API
  deleteFeature(id: number,name:string) {

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { dataProp: name,dataTitle:"الصفة" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
   
        this.featureService.deleteFeature(id).subscribe(
          response => {
            this.dataSource.data = this.dataSource.data.filter(feature => feature.id !== id);
            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة الصفة ${name} بنجاح.`
              }
            });
          },
          error => console.error('Error deleting feature', error)
        );
       
      }
    });
    
  }

  // Cancel edit
  cancelEdit() {
    this.editingFeature = null;
  }

  // Check if a feature is being edited
  isEditing(feature: Feature): boolean {
    return this.editingFeature !== null && this.editingFeature.id === feature.id;
  }
}
