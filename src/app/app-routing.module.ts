import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './components/buttons/buttons.component';

import { FormsComponent } from './components/forms/forms.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { DetailleFolderComponent } from './dashboard/dashboard-components/detaille-folder/detaille-folder.component';
import { LawyerGridComponent } from './dashboard/dashboard-components/lawyer-grid/lawyer-grid.component';
import { FeatureGridComponent } from './dashboard/dashboard-components/feature-grid/feature-grid.component';
import { CourtGridComponent } from './dashboard/dashboard-components/court-grid/court-grid.component';
import { JudgeGridComponent } from './dashboard/dashboard-components/judge-grid/judge-grid.component';
import { ProcedureGridComponent } from './dashboard/dashboard-components/procedure-grid/procedure-grid.component';
import { TopicGridComponent } from './dashboard/dashboard-components/topic-grid/topic-grid.component';

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path:"home", component:DashboardComponent},
      {path:"forms", component:FeatureGridComponent},
      {path:"detaille-folder/:id",component:DetailleFolderComponent},
      {path:"grid-list",component:CourtGridComponent},
      {path:"alerts",component:JudgeGridComponent},
      {path:"menu",component:ProcedureGridComponent},
      {path:"table",component:TopicGridComponent}

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
