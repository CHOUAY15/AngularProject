// lawyer-grid.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lawyer } from 'src/app/shared/models/folder';

@Component({
  selector: 'app-lawyer-grid',
  templateUrl: './lawyer-grid.component.html',
  styleUrls: ['./lawyer-grid.component.scss']
})
export class LawyerGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'authority', 'actions'];
  dataSource: MatTableDataSource<Lawyer>;
  newLawyer: Lawyer = { id: 0, authority: '', fullName: '' };
  editingLawyer: Lawyer | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Mock data, replace with actual data fetching logic
    const initialData = [
      { id: 1, authority: 'نقابة المحامين أ', fullName: 'محمد أحمد' },
      { id: 2, authority: 'نقابة المحامين ب', fullName: 'فاطمة علي' },
      // Add more mock data to see pagination in action
      { id: 3, authority: 'نقابة المحامين ج', fullName: 'أحمد محمود' },
      { id: 4, authority: 'نقابة المحامين د', fullName: 'زينب حسن' },
      { id: 5, authority: 'نقابة المحامين ه', fullName: 'علي عمر' },
      { id: 6, authority: 'نقابة المحامين و', fullName: 'نورا سعيد' },
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
  addLawyer() {
    this.newLawyer.id = Math.max(0, ...this.dataSource.data.map(l => l.id)) + 1;
    this.dataSource.data = [...this.dataSource.data, { ...this.newLawyer }];
    this.newLawyer = { id: 0, authority: '', fullName: '' };
  }

  editLawyer(lawyer: Lawyer) {
    this.editingLawyer = { ...lawyer };
  }

  updateLawyer() {
    if (this.editingLawyer) {
      const index = this.dataSource.data.findIndex(l => l.id === this.editingLawyer!.id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.editingLawyer };
        this.dataSource.data = [...this.dataSource.data];
      }
      this.editingLawyer = null;
    }
  }

  deleteLawyer(id: number) {
    this.dataSource.data = this.dataSource.data.filter(lawyer => lawyer.id !== id);
  }

  cancelEdit() {
    this.editingLawyer = null;
  }

  isEditing(lawyer: Lawyer): boolean {
    return this.editingLawyer !== null && this.editingLawyer.id === lawyer.id;
  }
}