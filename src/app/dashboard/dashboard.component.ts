import { Component, OnInit } from '@angular/core';
import { AddFolderComponent } from './dashboard-components/add-folder/add-folder.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private dialog: MatDialog) {}

  openAddFileDialog(): void {
    const dialogRef = this.dialog.open(AddFolderComponent, {
      width: '500px',
      direction: 'rtl'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result from the dialog (e.g., add the new file to your list)
        console.log('New file added:', result);
        // You can call a method here to update your file list or perform any other necessary actions
      }
    });
  }

}
