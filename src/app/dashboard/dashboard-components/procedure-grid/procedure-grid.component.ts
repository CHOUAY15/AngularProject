import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ProcedureType {
  id: number;
  description: string;
}

@Component({
  selector: 'app-procedure-grid',
  templateUrl: './procedure-grid.component.html',
  styleUrls: ['./procedure-grid.component.scss']
})
export class ProcedureGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'actions'];
  dataSource: MatTableDataSource<ProcedureType>;
  newProcedure: ProcedureType = { id: 0, description: '' };
  editingProcedure: ProcedureType | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    const initialData: ProcedureType[] = [
      { id: 1, description: 'تنفيذ' },
      { id: 2, description: 'تنازل' }
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

  addProcedure() {
    this.newProcedure.id = Math.max(0, ...this.dataSource.data.map(p => p.id)) + 1;
    this.dataSource.data = [...this.dataSource.data, { ...this.newProcedure }];
    this.newProcedure = { id: 0, description: '' };
  }

  editProcedure(procedure: ProcedureType) {
    this.editingProcedure = { ...procedure };
  }

  updateProcedure() {
    if (this.editingProcedure) {
      const index = this.dataSource.data.findIndex(p => p.id === this.editingProcedure!.id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.editingProcedure };
        this.dataSource.data = [...this.dataSource.data];
      }
      this.editingProcedure = null;
    }
  }

  deleteProcedure(id: number) {
    this.dataSource.data = this.dataSource.data.filter(procedure => procedure.id !== id);
  }

  cancelEdit() {
    this.editingProcedure = null;
  }

  isEditing(procedure: ProcedureType): boolean {
    return this.editingProcedure !== null && this.editingProcedure.id === procedure.id;
  }
}
