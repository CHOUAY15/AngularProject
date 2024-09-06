import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TopicService } from 'src/app/core/service/topic.service';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

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
  editingTopic: Topic | null = null;
  topicForm:FormGroup;
  editDescriptionControl:FormControl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private topicService: TopicService,private fb: FormBuilder,   private dialog: MatDialog) {  // Inject the service
    this.dataSource = new MatTableDataSource<Topic>([]);
    this.topicForm = this.fb.group({
      description: ['', [Validators.required]],
    });
    this.editDescriptionControl = new FormControl('', [Validators.required]);

  }

  ngOnInit() {
    this.loadTopics();  // Load topics from API when component initializes
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

  // Load all topics from the API
  loadTopics() {
    this.topicService.getAllTopics().subscribe(
      data => this.dataSource.data = data,
      error => console.error('Error fetching topics', error)
    );
  }

  // Add a new topic using the API
  addTopic() {
    if (this.topicForm.valid) {
      const newTopic: Topic = {
        id: 0,
        description: this.topicForm.get('description')?.value,
      };
      this.topicService.createTopic(newTopic).subscribe(
        topicCreated => {
          this.dataSource.data = [...this.dataSource.data, topicCreated];
          this.topicForm.reset();
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تمت الإضافة بنجاح',
              message: `تمت إضافة الموضوع ${topicCreated.description} بنجاح.`
            }
          });
        },
        error => console.error('Error creating topic', error)
      );
    }
  }

  // Edit an existing topic
  editTopic(topic: Topic) {
    this.editingTopic = { ...topic };
    this.editDescriptionControl.setValue(topic.description);

  }

  // Update the topic using the API
  updateTopic() {
    if (this.editingTopic && this.editDescriptionControl.valid) {
      const updatedTopic: Topic = {
        ...this.editingTopic,
        description: this.editDescriptionControl.value,
      };
      this.topicService.updateTopic(updatedTopic.id, updatedTopic).subscribe(
        updatedTopic => {
          const index = this.dataSource.data.findIndex(c => c.id === updatedTopic.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedTopic;
            this.dataSource.data = [...this.dataSource.data];
          }
          this.editingTopic = null;
        },
        error => console.error('Error updating topic', error)
      );
    }
  }

  // Delete a topic using the API
  deleteTopic(id: number,name:string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { dataProp: name,dataTitle:"الموضوع" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.topicService.deleteTopic(id).subscribe(
          response => {
            this.dataSource.data = this.dataSource.data.filter(topic => topic.id !== id);

            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة الموضوع ${name} بنجاح.`
              }
            });
          },
          error => console.error('Error deleting topic', error)
        );
   
        
       
      }
    });
    
  }

  // Cancel edit
  cancelEdit() {
    this.editingTopic = null;
  }

  // Check if a topic is being edited
  isEditing(topic: Topic): boolean {
    return this.editingTopic !== null && this.editingTopic.id === topic.id;
  }
}
