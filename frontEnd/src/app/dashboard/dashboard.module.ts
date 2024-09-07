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
import {  RouterModule } from '@angular/router';
import { AddNewOptionDialogComponent } from './dashboard-components/add-new-option-dialog/add-new-option-dialog.component';
import { DetailleFolderComponent } from './dashboard-components/detaille-folder/detaille-folder.component';
import { DeleteConfirmationDialogComponent } from './dashboard-components/card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { LawyerGridComponent } from './dashboard-components/lawyer-grid/lawyer-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FeatureGridComponent } from './dashboard-components/feature-grid/feature-grid.component';
import { CourtGridComponent } from './dashboard-components/court-grid/court-grid.component';
import { JudgeGridComponent } from './dashboard-components/judge-grid/judge-grid.component';
import { ProcedureGridComponent } from './dashboard-components/procedure-grid/procedure-grid.component';
import { TopicGridComponent } from './dashboard-components/topic-grid/topic-grid.component';
import { MatChipsModule } from '@angular/material/chips';
import { PartyGridComponent } from './dashboard-components/party-grid/party-grid.component';
import { UpdateFolderComponent } from './dashboard-components/update-folder/update-folder.component';
import { InvitOptionDialogComponent } from './dashboard-components/detaille-folder/invit-option-dialog/invit-option-dialog.component';
import { SuccessDialogComponent } from './dashboard-components/success-dialog/success-dialog.component';




@NgModule({
  declarations: [
    DashboardComponent,
    FolderListComponent,
    CardFolderComponent,
    AddFolderComponent,
    AddNewOptionDialogComponent,
    DetailleFolderComponent,
    DeleteConfirmationDialogComponent,
    LawyerGridComponent,
    FeatureGridComponent,
    CourtGridComponent,
    JudgeGridComponent,
    ProcedureGridComponent,
    TopicGridComponent,
    PartyGridComponent,
    UpdateFolderComponent,
    InvitOptionDialogComponent,
    SuccessDialogComponent
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,

    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  exports: [
    DashboardComponent,
    FolderListComponent,
    CardFolderComponent,
    AddFolderComponent,
    AddNewOptionDialogComponent,
    DetailleFolderComponent,
    DeleteConfirmationDialogComponent,
    LawyerGridComponent,
    FeatureGridComponent,
    CourtGridComponent,
    JudgeGridComponent,
    ProcedureGridComponent,
    TopicGridComponent,
    PartyGridComponent,
    UpdateFolderComponent,
    InvitOptionDialogComponent,
    SuccessDialogComponent

  ]
})
export class DashboardModule { }
