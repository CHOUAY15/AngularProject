import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Feature } from 'src/app/shared/models/folder';



@Component({
  selector: 'app-feature-grid',
  templateUrl: './feature-grid.component.html',
  styleUrls: ['./feature-grid.component.scss']
})
export class FeatureGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'actions'];
  dataSource: MatTableDataSource<Feature>;
  newFeature: Feature = { id: 0, description: '' };
  editingFeature: Feature | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    const initialData = [
      { id: 1, description: 'مدعي' },
      { id: 2, description: 'مدعي عليه' },
      { id: 3, description: 'مستأنف' },
      { id: 4, description: 'مستأنف عليه' },
      { id: 5, description: 'طالب تنفيذ' },
      { id: 6, description: 'منفذ عليه' },
    ];
    this.dataSource = new MatTableDataSource(initialData);
  }

  ngOnInit() {}

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

  addFeature() {
    this.newFeature.id = Math.max(0, ...this.dataSource.data.map(f => f.id)) + 1;
    this.dataSource.data = [...this.dataSource.data, { ...this.newFeature }];
    this.newFeature = { id: 0, description: '' };
  }

  editFeature(feature: Feature) {
    this.editingFeature = { ...feature };
  }

  updateFeature() {
    if (this.editingFeature) {
      const index = this.dataSource.data.findIndex(f => f.id === this.editingFeature!.id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.editingFeature };
        this.dataSource.data = [...this.dataSource.data];
      }
      this.editingFeature = null;
    }
  }

  deleteFeature(id: number) {
    this.dataSource.data = this.dataSource.data.filter(feature => feature.id !== id);
  }

  cancelEdit() {
    this.editingFeature = null;
  }

  isEditing(feature: Feature): boolean {
    return this.editingFeature !== null && this.editingFeature.id === feature.id;
  }
}
