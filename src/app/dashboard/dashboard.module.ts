import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module'
import { DashboardComponent } from './dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FolderListComponent } from './dashboard-components/folder-list/folder-list.component';
import { CardFolderComponent } from './dashboard-components/card-folder/card-folder.component';
import { AddFolderComponent } from './dashboard-components/add-folder/add-folder.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    DashboardComponent,
    FolderListComponent,
    CardFolderComponent,
    AddFolderComponent

  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    DashboardComponent,
    FolderListComponent,
    CardFolderComponent,
    AddFolderComponent

  ]
})
export class DashboardModule { }
