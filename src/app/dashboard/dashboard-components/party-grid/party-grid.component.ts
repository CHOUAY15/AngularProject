// party-grid.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

interface Feature {
  id: number;
  description: string;
}

interface Party {
  id: number;
  fullName: string;
  adresse: string;
  feature: Feature;
}

@Component({
  selector: 'app-party-grid',
  templateUrl: './party-grid.component.html',
  styleUrls: ['./party-grid.component.scss']
})
export class PartyGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'adresse', 'feature', 'actions'];
  dataSource: MatTableDataSource<Party>;
  newParty: Party = { id: 0, fullName: '', adresse: '', feature: { id: 0, description: '' } };
  editingParty: Party | null = null;
  fileNum: any;

  features: Feature[] = [
    { id: 1, description: 'مدعي' },
    { id: 2, description: 'مدعى عليه' },
    { id: 3, description: 'شاهد' },
    // Add more features as needed
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute) {
    const initialData = [
      { id: 1, adresse: 'شارع الميلحة الجديدة', fullName: 'زكرياء الحرشي', feature: { id: 1, description: 'مدعي' } },
      // Add more mock data here
    ];
    this.dataSource = new MatTableDataSource(initialData);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fileNum = params.get('fileNum');
    });
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

  addParty() {
    this.newParty.id = Math.max(0, ...this.dataSource.data.map(p => p.id)) + 1;
    this.dataSource.data = [...this.dataSource.data, { ...this.newParty }];
    this.newParty = { id: 0, fullName: '', adresse: '', feature: { id: 0, description: '' } };
  }

  editParty(party: Party) {
    this.editingParty = { ...party };
  }

  updateParty() {
    if (this.editingParty) {
      const index = this.dataSource.data.findIndex(p => p.id === this.editingParty!.id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.editingParty };
        this.dataSource.data = [...this.dataSource.data];
      }
      this.editingParty = null;
    }
  }

  deleteParty(id: number) {
    this.dataSource.data = this.dataSource.data.filter(party => party.id !== id);
  }

  cancelEdit() {
    this.editingParty = null;
  }

  isEditing(party: Party): boolean {
    return this.editingParty !== null && this.editingParty.id === party.id;
  }
}