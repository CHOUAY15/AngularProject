import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Folder } from 'src/app/shared/models/folder';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-card-folder',
  templateUrl: './card-folder.component.html',
  styleUrl: './card-folder.component.scss'
})
export class CardFolderComponent {

  @Input() folder!:Folder;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}
onUpdate() {
throw new Error('Method not implemented.');
}
onDelete() {
  const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
    width: '350px',
    data: { folderNumber: this.folder.fileNumber }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // User confirmed deletion
      console.log('Deleting folder:', this.folder.fileNumber);
      // Implement your delete logic here
    }
  });
}
onView() {
throw new Error('Method not implemented.');
}

}
