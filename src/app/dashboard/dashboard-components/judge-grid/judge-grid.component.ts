import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  newJudge: Judge = { id: 0, fullName: '', gender: '' };
  editingJudge: Judge | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    const initialData: Judge[] = [
      { id: 1, fullName: 'وليد شواي', gender: 'استاذ' },
      { id: 2, fullName: 'فاطمة فرنون', gender: 'استاذة' }
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

  addJudge() {
    this.newJudge.id = Math.max(0, ...this.dataSource.data.map(j => j.id)) + 1;
    this.dataSource.data = [...this.dataSource.data, { ...this.newJudge }];
    this.newJudge = { id: 0, fullName: '', gender: '' };
  }

  editJudge(judge: Judge) {
    this.editingJudge = { ...judge };
  }

  updateJudge() {
    if (this.editingJudge) {
      const index = this.dataSource.data.findIndex(j => j.id === this.editingJudge!.id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.editingJudge };
        this.dataSource.data = [...this.dataSource.data];
      }
      this.editingJudge = null;
    }
  }

  deleteJudge(id: number) {
    this.dataSource.data = this.dataSource.data.filter(judge => judge.id !== id);
  }

  cancelEdit() {
    this.editingJudge = null;
  }

  isEditing(judge: Judge): boolean {
    return this.editingJudge !== null && this.editingJudge.id === judge.id;
  }
}
