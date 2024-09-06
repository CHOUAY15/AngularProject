import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { InvitOptionDialogComponent } from './invit-option-dialog/invit-option-dialog.component';
import { FileService } from 'src/app/core/service/file.service';

@Component({
  selector: 'app-detaille-folder',
  templateUrl: './detaille-folder.component.html',
  styleUrl: './detaille-folder.component.scss'
})
export class DetailleFolderComponent  implements OnInit{



  folder!: any;
  foderID:any;

  constructor(private route:Router, private dialog: MatDialog,private router:ActivatedRoute,private fileService:FileService){

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.foderID = params.get('id');
   });
   this.getFolderDetails(this.foderID);
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
    this.route.navigateByUrl(`parties/${this.folder.fileNumber}/${this.folder.id}`)
    }
    showLawyers() {
   this.route.navigateByUrl(`lawyers/${this.folder.fileNumber}/${this.folder.id}`)
    }
    generateInvitation() {
      const dialogRef = this.dialog.open(InvitOptionDialogComponent, {
        width: '300px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
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

 
}


