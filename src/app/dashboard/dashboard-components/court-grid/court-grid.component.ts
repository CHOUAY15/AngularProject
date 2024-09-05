import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  newCourt: Court = { id: 0, name: '', city: '' };
  editingCourt: Court | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Mock data
    const initialData = [
      { id: 1, name: 'محكمة ابتدائية', city: 'الرباط' },
      { id: 2, name: 'محكمة الاستئناف', city: 'تطوان' },
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
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} من ${length}`;
    };
  }

  addCourt() {
    this.newCourt.id = Math.max(0, ...this.dataSource.data.map(c => c.id)) + 1;
    this.dataSource.data = [...this.dataSource.data, { ...this.newCourt }];
    this.newCourt = { id: 0, name: '', city: '' };
  }

  editCourt(court: Court) {
    this.editingCourt = { ...court };
  }

  updateCourt() {
    if (this.editingCourt) {
      const index = this.dataSource.data.findIndex(c => c.id === this.editingCourt!.id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.editingCourt };
        this.dataSource.data = [...this.dataSource.data];
      }
      this.editingCourt = null;
    }
  }

  deleteCourt(id: number) {
    this.dataSource.data = this.dataSource.data.filter(court => court.id !== id);
  }

  cancelEdit() {
    this.editingCourt = null;
  }

  isEditing(court: Court): boolean {
    return this.editingCourt !== null && this.editingCourt.id === court.id;
  }
}
