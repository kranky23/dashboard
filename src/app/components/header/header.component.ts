import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServices } from 'src/app/services/data.services';
import { DoctorLoginService } from 'src/app/services/doctor-login.service';
import { doctorInitial } from '../models/doctorInitial.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  doctorname: doctorInitial | undefined
  constructor(
    private loginService: DoctorLoginService,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.loginService.getDoctor().subscribe(
      (value: doctorInitial) => {
        this.doctorname = value
      }, 
      err => {
        console.log(err)
      }
    )
  }
  logout() {
    this.loginService.setnulltoken()
    this.loginService.logout();
    this.router.navigate(['/'])
  }
}
