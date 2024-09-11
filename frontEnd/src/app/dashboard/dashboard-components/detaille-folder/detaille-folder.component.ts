import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { InvitOptionDialogComponent } from './invit-option-dialog/invit-option-dialog.component';
import { FileService } from 'src/app/core/service/file.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';
import { ContentService } from 'src/app/core/service/content.service';

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
    private fileService: FileService,
    private contentService: ContentService
  ) {}

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

  generateDeliveryCertificate() {
    const dialogRef = this.dialog.open(InvitOptionDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'optionOne') {
        console.log('Option One selected');
        console.log('hhahahhahahha', this.folder);
        if (
          this.folder.lawyers.length === 0 ||
          this.folder.parties.length < 2
        ) {
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تنبيه  ',
              message: `لا يمكنك توليد هذا المستند لأنه يجب أن يكون هناك على الأقل محامٍ واحد وأكثر من طرفين`,
            },
          });
        } else {
          this.folder.parties.forEach((party: any) => {
            this.generate(party, this.folder, 2,2);
          });
        }

        // Handle option one selection
      } else if (result === 'optionTwo') {
        console.log('hhahahhahahha', this.folder);
        if (
          this.folder.lawyers.length === 0 ||
          this.folder.parties.length < 2
        ) {
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تنبيه  ',
              message: `لا يمكنك توليد هذا المستند لأنه يجب أن يكون هناك على الأقل محامٍ واحد وأكثر من طرفين`,
            },
          });
        } else {
          this.folder.lawyers.forEach((lawyer: any) => {
            this.generate(lawyer, this.folder, 1,2);
          });
        }
      }
    });
  }



  generateInvitation() {
    const dialogRef = this.dialog.open(InvitOptionDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'optionOne') {
        console.log('Option One selected');
        console.log('hhahahhahahha', this.folder);
        if (
          this.folder.lawyers.length === 0 ||
          this.folder.parties.length < 2
        ) {
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تنبيه  ',
              message: `لا يمكنك توليد هذا المستند لأنه يجب أن يكون هناك على الأقل محامٍ واحد وأكثر من طرفين`,
            },
          });
        } else {
          this.folder.parties.forEach((party: any) => {
            this.generate(party, this.folder, 2,1);
          });
        }

        // Handle option one selection
      } else if (result === 'optionTwo') {
        console.log('hhahahhahahha', this.folder);
        if (
          this.folder.lawyers.length === 0 ||
          this.folder.parties.length < 2
        ) {
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تنبيه  ',
              message: `لا يمكنك توليد هذا المستند لأنه يجب أن يكون هناك على الأقل محامٍ واحد وأكثر من طرفين`,
            },
          });
        } else {
          this.folder.lawyers.forEach((lawyer: any) => {
            this.generate(lawyer, this.folder, 1,1);
          });
        }
      }
    });
  }

  generate(data: any, folder: any, nmb: number,numb2:number) {
    if (numb2===1) {
      const content = this.contentService.getHtmlContentA(data, folder, nmb);
      this.htmlToDoc(content, data.fullName);
      
    } else{
      const content = this.contentService.getHtmlContentB(data, folder, nmb);

      this.htmlToDoc(content, data.fullName);

    }
   
   

   
  }


  onUpdate() {
    const dialogRef = this.dialog.open(UpdateFolderComponent, {
      width: '600px',
      data: { folder: { ...this.folder } },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
  htmlToDoc = (content: string, fullName: any) => {
    const blob = new Blob(['\ufeff', content], {
      type: 'application/msword',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fullName}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };
}
