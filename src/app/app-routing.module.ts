import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { DoctorViewComponent } from './components/doctor-view/doctor-view.component';
import { PatientResponseViewComponent } from './components/patient-response-view/patient-response-view.component';
import { PatientViewComponent } from './components/patient-view/patient-view.component';
import { AuthGuard } from './guards/auth.guard';
import {PatientMessageComponent} from "./components/patient-message/patient-message.component";
import { MessageSpecialistComponent } from './components/message-specialist/message-specialist.component';

const routes: Routes = [
  {
    path:'',
    component: DoctorLoginComponent
  },
  {path: 'doctors-view/:id', component: DoctorViewComponent, canActivate: [AuthGuard]},
  { path: 'patient-view/:pid', component: PatientViewComponent, canActivate: [AuthGuard]},
  { path: 'patient-response', component: PatientResponseViewComponent, canActivate: [AuthGuard]},
  { path: 'patient-message/:pid', component: PatientMessageComponent, canActivate: [AuthGuard]},
  { path: 'patient-specialist/:spec_id', component: MessageSpecialistComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', relativeLinkResolution: 'corrected'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
