import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { InvitOptionDialogComponent } from './invit-option-dialog/invit-option-dialog.component';
import { FileService } from 'src/app/core/service/file.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';

@Component({
  selector: 'app-detaille-folder',
  templateUrl: './detaille-folder.component.html',
  styleUrls: ['./detaille-folder.component.scss'],
})
export class DetailleFolderComponent implements OnInit {
  folder!: any;
  folderID: any;

  constructor(
    private route: Router,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.folderID = params.get('id');
      this.getFolderDetails(this.folderID);
    });
  }

  getFolderDetails(id: number): void {
    this.fileService.getFileById(id).subscribe(
      (data) => {
        this.folder = data;
      },
      (error) => {
        console.error('Error fetching folder details:', error);
      }
    );
  }

  showParties() {
    this.route.navigateByUrl(
      `parties/${this.folder.fileNumber}/${this.folder.id}`
    );
  }

  showLawyers() {
    this.route.navigateByUrl(
      `lawyers/${this.folder.fileNumber}/${this.folder.id}`
    );
  }

  generateInvitation() {
    const dialogRef = this.dialog.open(InvitOptionDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'optionOne') {
        console.log('Option One selected');
        // Handle option one selection
      } else if (result === 'optionTwo') {
        console.log('Option Two selected');
        // Handle option two selection
      }
    });
  }

  onUpdate() {
    const dialogRef = this.dialog.open(UpdateFolderComponent, {
      width: '600px',
      data: { folder: { ...this.folder } }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Updating folder:', result);
      this.fileService.getFileById(this.folderID).subscribe(
        (data) => {
          this.folder = data;
        },
        (error) => {
          console.error('Error fetching folder details:', error);
        }
      );
    });
  }



  onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { folderNumber: this.folder.fileNumber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fileService.deleteFile(this.folderID).subscribe(
          (response) => {
            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة الملف بنجاح.`,
              },
            });
            this.route.navigateByUrl('/');
          },
          (error) => console.error('Error deleting file', error)
        );
      }
    });
  }
}
