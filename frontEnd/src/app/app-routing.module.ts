import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { DetailleFolderComponent } from './dashboard/dashboard-components/detaille-folder/detaille-folder.component';
import { LawyerGridComponent } from './dashboard/dashboard-components/lawyer-grid/lawyer-grid.component';
import { FeatureGridComponent } from './dashboard/dashboard-components/feature-grid/feature-grid.component';
import { CourtGridComponent } from './dashboard/dashboard-components/court-grid/court-grid.component';
import { JudgeGridComponent } from './dashboard/dashboard-components/judge-grid/judge-grid.component';
import { ProcedureGridComponent } from './dashboard/dashboard-components/procedure-grid/procedure-grid.component';
import { TopicGridComponent } from './dashboard/dashboard-components/topic-grid/topic-grid.component';
import { PartyGridComponent } from './dashboard/dashboard-components/party-grid/party-grid.component';
import { BarGridComponent } from './dashboard/dashboard-components/bar-grid/bar-grid.component';

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path:"home", component:DashboardComponent},
      {path:"features", component:FeatureGridComponent},
      {path:"detaille-folder/:id",component:DetailleFolderComponent},
      {path:"courts",component:CourtGridComponent},
      {path:"bars", component:BarGridComponent},
      {path:"judges",component:JudgeGridComponent},
      {path:"actions",component:ProcedureGridComponent},
      {path:"topics",component:TopicGridComponent},
      {path:"lawyers/:fileNum/:id",component:LawyerGridComponent},
      {path:"parties/:fileNum/:id",component:PartyGridComponent}

    ]
  },

  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
