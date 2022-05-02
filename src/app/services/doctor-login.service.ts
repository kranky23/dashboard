import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { doctorInitial } from '../components/models/doctorInitial.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorLoginService {
  url = "http://localhost:8096"

  subject = new BehaviorSubject<any>('Dr. Abc')
  constructor(private http: HttpClient) { }

  //calling the server to generate the token
  generateToken(credentials: any) {
    return this.http.post(`${environment.url}/token`, credentials)
  }



  //for login
  loginUser(response: doctorInitial) {
    this.subject.next(response)
    localStorage.setItem("token", response.token)
    localStorage.setItem("doctorId", response.id)
    return true;
  }

  setnulltoken() {
    this.subject.next(null)
  }

  getDoctor(): Observable<doctorInitial> {
    return this.subject.asObservable()
  }

  isloggedIn() {
    let token = localStorage.getItem("token");
    if (token === undefined || token === '' || token === null) {
      console.log("false")
      return false;
    }
    else {
      console.log("true")
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('doctorId')
    return true;
  }

  getToken() {
    // console.log("GET TOKEN ",localStorage.getItem('token'))

    return localStorage.getItem('token');
  }

  getDoctorDetails(doc_id:any)
  {
    let token = localStorage.getItem("token");
    console.log(token);
    let header = new HttpHeaders(
      {
        Authorization: "Bearer " + token
      }
    )
    return this.http.get(`${this.url}/doctorDetails/${doc_id}`,{'headers':header, responseType: 'json'})
  }
}
