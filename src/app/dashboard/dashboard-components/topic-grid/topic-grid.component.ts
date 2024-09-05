import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Topic {
  id: number;
  description: string;
}

@Component({
  selector: 'app-topic-grid',
  templateUrl: './topic-grid.component.html',
  styleUrls: ['./topic-grid.component.scss']
})
export class TopicGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'actions'];
  dataSource: MatTableDataSource<Topic>;
  newTopic: Topic = { id: 0, description: '' };
  editingTopic: Topic | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    const initialData: Topic[] = [
      { id: 1, description: 'ضرب وجرح' },
      { id: 2, description: 'طلاق' }
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

  addTopic() {
    this.newTopic.id = Math.max(0, ...this.dataSource.data.map(t => t.id)) + 1;
    this.dataSource.data = [...this.dataSource.data, { ...this.newTopic }];
    this.newTopic = { id: 0, description: '' };
  }

  editTopic(topic: Topic) {
    this.editingTopic = { ...topic };
  }

  updateTopic() {
    if (this.editingTopic) {
      const index = this.dataSource.data.findIndex(t => t.id === this.editingTopic!.id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.editingTopic };
        this.dataSource.data = [...this.dataSource.data];
      }
      this.editingTopic = null;
    }
  }

  deleteTopic(id: number) {
    this.dataSource.data = this.dataSource.data.filter(topic => topic.id !== id);
  }

  cancelEdit() {
    this.editingTopic = null;
  }

  isEditing(topic: Topic): boolean {
    return this.editingTopic !== null && this.editingTopic.id === topic.id;
  }
}
