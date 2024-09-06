import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';
import { FileService } from 'src/app/core/service/file.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-card-folder',
  templateUrl: './card-folder.component.html',
  styleUrl: './card-folder.component.scss'
})
export class CardFolderComponent {

  @Input() folder!:any;

  constructor(
    private dialog: MatDialog,
    private fileService:FileService
  ) {}
  onUpdate() {
    const dialogRef = this.dialog.open(UpdateFolderComponent, {
      width: '600px',
      data: { folder: { ...this.folder } } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed update
        console.log('Updating folder:', result);
        // Implement your update logic here
        // For example: this.folderService.updateFolder(result);
      }
    });
  }
onDelete(id:number) {
  const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
    width: '350px',
    data: { dataProp: this.folder.fileNumber,dataTitle:"الملف" }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.fileService.deleteFile(id).subscribe(
        response => {
      

          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تمت الازالة بنجاح',
              message: `تمت ازالة الملف  بنجاح.`
            }
          });
  
  
        },
        error => console.error('Error deleting file', error)
      );
    }
  });
}


}
