import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PatientViewComponent } from './components/patient-view/patient-view.component';
import { DoctorViewComponent } from './components/doctor-view/doctor-view.component';
import { PatientResponseViewComponent } from './components/patient-response-view/patient-response-view.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { PatientMessageComponent } from './components/patient-message/patient-message.component';
import { MessageSpecialistComponent } from './components/message-specialist/message-specialist.component';
import { SelfNoteComponent } from './components/self-note/self-note.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    PatientViewComponent,
    DoctorViewComponent,
    PatientResponseViewComponent,
    DoctorLoginComponent,
    PatientMessageComponent,
    MessageSpecialistComponent,
    SelfNoteComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
