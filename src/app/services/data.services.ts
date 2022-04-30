import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, Subject, Subscriber } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DataServices {
    subject  = new Subject<string>()
    private patientIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('0');
    public pid: Observable<string> = this.patientIdSubject.asObservable()

    constructor(private http: HttpClient) {  }

    sendMessage(id: string) {
        this.subject.next(id)
    }
    getMessage(): Observable<string> {
        return this.subject.asObservable()
    }

    setPatientSubjectBehaviour(id: string) {
        this.patientIdSubject.next(id)
    }

    getPatientSubjectBehaviour(): Observable<string> {
        return this.patientIdSubject.asObservable()
    }


    getPatientData() {
        // let token = localStorage.getItem("token");
        let token = localStorage.getItem("token");
        console.log(token);
        let header = new HttpHeaders(
            {
                Authorization: "Bearer " + token
            }
        )
        let id = localStorage.getItem("doctorId")
        return this.http.get<any>(`${environment.url}/doctor/dashboard/${id}/patients`,{'headers':header})
    }

    httpOptions() {
        let token = localStorage.getItem("token");
        let header = new HttpHeaders(
            {
                Authorization: "Bearer " + token
            }
        )
        return { 'headers': header };
    }

    getIndividualPatientData(id:string){
        // let token = localStorage.getItem("token");
        let token = localStorage.getItem("token");
        console.log(token);
        let header = new HttpHeaders(
            {
                Authorization: "Bearer " + token
            }
        )
        return this.http.get<any>(`${environment.url}/doctor/dashboard/${id}/patient`,{'headers':header})
    }

    getSectionProgress(p_id: string) {
        return this.http.get<any>(`${environment.url}/doctor/dashboard/${p_id}/progress`, this.httpOptions())
    }

    getMoodData(p_id: string) {
        return this.http.get<any>(`${environment.url}/doctor/dashboard/${p_id}/mood`, this.httpOptions())
    }

    getQuestionBySectionId(id: string) {
        return this.http.get<any>(`${environment.url}/doctor/response/questions/${id}`, this.httpOptions())
    }

    getResponseBySectionId(s_id: string, p_id: string) {
        return this.http.get<any>(`${environment.url}/doctor/response/${s_id}/${p_id}`, this.httpOptions())
    }

    generateLinkService(LinkCredentials: any) {
        return this.http.post(`${environment.url}/generateLink`, LinkCredentials, this.httpOptions())
    }

    addOrderSerService(credentials: any, p_id: string){
      return this.http.post(`${environment.url}/doctor/response/${p_id}/addOrderSet`, credentials, this.httpOptions())
    }

    resetOrderSerService(credentials: any, p_id: string){
        return this.http.post(`${environment.url}/doctor/response/${p_id}/resetOrderSet`, credentials, this.httpOptions())
      }

    getOrderService(p_id: string){
      return this.http.get<any> (`${environment.url}/doctor/response/${p_id}/getOrderSet`, this.httpOptions())
    }

    getAllspecialist(){
      return this.http.get<any> (`${environment.url}/doctor/getAllSpecialist`, this.httpOptions())
    }
}
