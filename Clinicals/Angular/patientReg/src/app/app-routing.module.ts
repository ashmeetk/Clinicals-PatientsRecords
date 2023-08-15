import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyzeComponent } from './component/analyze/analyze.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { ClinicalDetailsComponent } from './component/clinical-details/clinical-details.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'analyze/:patientId',
    component: AnalyzeComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'clinicalDetails/:patientId',
    component: ClinicalDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
