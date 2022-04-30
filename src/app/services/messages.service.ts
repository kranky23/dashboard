import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Messages} from "../messages";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:8096';

  public getMessages(pat_id: any) {
    let token = localStorage.getItem("token");
    console.log(token);
    let header = new HttpHeaders(
      {
        Authorization: "Bearer " + token
      }
    )
    var patient_id = parseInt(pat_id);
    return this.http.get<any[]>(`${this.baseUrl}/getMessages/${patient_id}`, {'headers':header, responseType: 'json'});
  }


  public sendMessage(messageToBeSent: Messages,pat_id:any) {
    let token = localStorage.getItem("token");
    console.log(messageToBeSent);
    let header = new HttpHeaders(
      {
        Authorization: "Bearer " + token
      }
    )
    var patient_id = parseInt(pat_id);
    var doctor_id = parseInt(localStorage.getItem("doctorId")!);
    return this.http.post<any>(`${this.baseUrl}/postMessage/${pat_id}/${doctor_id}`, messageToBeSent, {'headers':header, responseType: 'json'});
  }

  updateReadReceipt(pat_id:any) {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization: "Bearer " + token
      }
    )
    return this.http.post<any>(`${this.baseUrl}/updateReadReceipt/${pat_id}`,true,{'headers':header, responseType: 'json'});
  }
}
