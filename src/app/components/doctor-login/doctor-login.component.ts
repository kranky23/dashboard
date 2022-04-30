import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorLoginService } from 'src/app/services/doctor-login.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {

  constructor(private doctorLoginService : DoctorLoginService, private router: Router) { }

  credentials={
    username:"",
    password:""
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("form is submitted")
    if((this.credentials.username!='' && this.credentials.password!='') && 
    (this.credentials.username!=null && this.credentials.password!=null)){
      this.doctorLoginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          //success
          console.log(response.token);
          this.doctorLoginService.loginUser(response);
          this.router.navigate(['/doctors-view', response.id])
        },
        error=>{
          console.log(error);
          alert("Wrong credentials!")
        }
      )
    }
    else{
      console.log("Fields are empty");
    }
  }
}
