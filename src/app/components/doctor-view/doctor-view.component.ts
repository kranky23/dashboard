import { Component, OnInit } from '@angular/core';
import { DoctorLoginService } from 'src/app/services/doctor-login.service';
import { doctorInitial } from '../models/doctorInitial.model';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { DataServices } from 'src/app/services/data.services';
import { specialist } from '../models/specialist.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit {
  doctorDetils: any;
  doctorDetailsForPrint : any;
  isAvail : any;
  tokenFromUI: string = "0123456789123456";
  encrypted: any = "";
  decrypted: string = "";
  generatedStringLink: string = ""
  generatedencLink: string = ""
  encodedUrl: string = ""
  linkCredentials ={
    doctorId:"",
    patEmail:"",
    patFname:""
  }
  specialistData : specialist[] | undefined;
  linkGenerationMessage : string =""
  linkGenerationError : string=""

  doctorDetailsLoaded:boolean =  false;
  constructor(private loginService: DoctorLoginService,
              private dataService : DataServices,
              private router:Router) { }

  ngOnInit(): void {
    this.loginService.getDoctor().subscribe(
      (value: any) => {
        console.log("called init method")
        console.log("value is ",value)
        this.doctorDetils = {username: value.username, id: value.id, fname: value.fname, lname: value.lname, isAvail: value.isAvail};
        this.doctorDetailsForPrint = {Username: value.username, Id: value.id, "First Name": value.fname, "Last Name": value.lname};
        this.isAvail = (this.doctorDetils.isAvail==="true")?true:false;
        this.doctorDetailsLoaded = true;
        console.log(this.doctorDetils);
        console.log(this.doctorDetailsForPrint);
      },
      (err:any) => {
        console.log(err)
      }
    )
  }

  generateLink(fname: HTMLInputElement, email: HTMLInputElement) {
    console.log(fname.value, email.value)
    this.linkCredentials.doctorId = this.doctorDetils.id
    this.linkCredentials.patEmail = email.value
    this.linkCredentials.patFname = fname.value
    this.dataService.generateLinkService(this.linkCredentials).subscribe(
      (data:any) => {
        console.log('success', data)
        this.linkGenerationMessage = data.patEmail
        console.log(this.linkGenerationMessage)
        setTimeout(()=>{                           //<<<---using ()=> syntax
          this.linkGenerationMessage = "";
     }, 10000);
    },
      error => {
        console.log('oops', error.error)
        this.linkGenerationError = error.error.patEmail
        console.log(this.linkGenerationError)
        setTimeout(()=>{                           //<<<---using ()=> syntax
          this.linkGenerationError = "";
     }, 10000);
    }
      // (response:any)=>{
      //   console.log("Response")
      //   console.log(response)
      //   this.linkGenerationMessage = response
      // },
      // error=>{
      //     console.log("Error here")
      //     // console.log(error)
      //     this.linkGenerationError = error
      // }
    )

    // this.generatedStringLink = fname.value + ':' + email.value + ':' + this.doctorDetils.id + ':' + (Date.now() + (20 * 60 * 1000))
    // this.encodedUrl = environment.url + '/abc?val=' + this.encryptUsingAES256()
  }

  getAllspecialist(){
    this.dataService.getAllspecialist()
    .pipe(map(value => {
      //password is used for readreceit
      let data = value.map((data:any) => {
        return { id: data.id, fname: data.fname, lname: data.lname ? data.lname : '' }
      })
      return data;
    }))
    .subscribe(
      data => {
        this.specialistData = data
        console.log("data password is "+data[0].fname)
        if (this.specialistData)
          console.log("password is "+this.specialistData[0].fname)
      },
      err => {
        console.log(err)
      }
    )
  }

  encryptUsingAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(this.generatedStringLink), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }

  decryptUsingAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

    this.decrypted = CryptoJS.AES.decrypt(
      this.encrypted, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
  }

  specialistMessage(spec_id:string){
    this.router.navigate(['/patient-specialist', spec_id]);
  }

  toSelfNote(){
    this.router.navigate(['/self-note', localStorage.getItem('doctorId')]);
  }

}
