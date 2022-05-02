import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import * as moment from "moment";

import { DataServices } from 'src/app/services/data.services';
import { patientDetails } from '../models/patientDetail.model';
import * as $ from 'jquery'
import {param} from "jquery";

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {
  // patientId: any
  singlePatient: patientDetails | undefined;
  fullpatientDetails: any
  progressData: any
  labels:any;
  labelsValue: any
  ordersetSuccess: string = ""
  ordersetUnsuccess: string = ""
  orderIsavail: boolean = false
  moodValue: any = {
    '1': 'Depressed',
    '2': 'Sad',
    '3': 'Normal',
    '4': 'Happy',
    '5': 'Excited'
  }
  credentials={
    first:"1",
    second:"0",
    third:"0",
    fourth:"0",
    fifth:"0",
    sixth:"0",
    seventh:"0",
    eight:"0"
  }

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Mood',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
    }
  };

  lineChartType: ChartType = 'line';



  constructor(
    private data: DataServices,
    private route:ActivatedRoute, private router: Router) { }
  id = ''

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['pid']
    this.route.paramMap.subscribe(
      (param: any) => {
        this.data.getIndividualPatientData(param.get('pid'))
        .pipe(map(
            data => {
              this.fullpatientDetails = data
              this.data.setPatientSubjectBehaviour(data.id)
              console.log(data)
              return {'Email': data.email, 'First Name': data.fname, 'Last Name': data.lname, }
            }
        ))
        .subscribe(
          data => {
              this.singlePatient = data
              this.data.getPatientSubjectBehaviour().subscribe(data => console.log())
          },
          err => {
              console.log(err)
          }
        )
        this.data.getSectionProgress(param.get('pid')).subscribe(
          value => {
            this.progressData = value.section
                                  .filter((v:any) => v.id > 0)
                                  .map((d:any) => ({title: d.title, id: d.id}))
            // Pass in a number for the percent
            console.log("progress data is "+this.progressData)
            if(this.progressData?.length === 0) this.updateDonutChart('#specificChart', 0, true);
            if(this.progressData?.length === 1)  this.updateDonutChart('#specificChart', 12.50, true);
            if(this.progressData?.length === 2)  this.updateDonutChart('#specificChart', 25, true);
            if(this.progressData?.length === 3)  this.updateDonutChart('#specificChart', 37.50, true);
            if(this.progressData?.length === 4)  this.updateDonutChart('#specificChart', 50, true);
            if(this.progressData?.length === 5)  this.updateDonutChart('#specificChart', 62.50, true);
            if(this.progressData?.length === 6)  this.updateDonutChart('#specificChart', 75, true);
            if(this.progressData?.length === 7)  this.updateDonutChart('#specificChart', 87.50, true);
            if(this.progressData?.length === 8)  this.updateDonutChart('#specificChart', 100, true);
            console.log(this.progressData)
          },
          err => {
            console.log(err)
          }
        )
        this.data.getMoodData(param.get('pid')).subscribe(
          value => {
            console.log(value)
            this.labels = value.map((v:any) => moment(v.moodTime).format('MMM DD hh:mm'))
            this.labelsValue = value.map((v:any) => v.mood)
            this.lineChartData = {
              datasets: [
                {
                  data: this.labelsValue,
                  label: 'Mood',
                  backgroundColor: 'rgba(148,159,177,0.2)',
                  borderColor: 'rgba(148,159,177,1)',
                  pointBackgroundColor: 'rgba(148,159,177,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                  fill: 'origin',
                }
              ],
                labels: this.labels
            };
            console.log(moment().format('MMM YY hh:mm'))
          },
          err => {
            console.log(err)
          }
        )
      }
    )
  }

  updateDonutChart (el: string, percent: number, donut: boolean) {
    percent = Math.round(percent);
    if (percent > 100) {
        percent = 100;
    } else if (percent < 0) {
        percent = 0;
    }
    var deg = Math.round(360 * (percent / 100));

    if (percent > 50) {
        $(el + ' .pie').css('clip', 'rect(auto, auto, auto, auto)');
        $(el + ' .right-side').css('transform', 'rotate(180deg)');
    } else {
        $(el + ' .pie').css('clip', 'rect(0, 1em, 1em, 0.5em)');
        $(el + ' .right-side').css('transform', 'rotate(0deg)');
    }
    if (donut) {
        $(el + ' .right-side').css('border-width', '0.1em');
        $(el + ' .left-side').css('border-width', '0.1em');
        $(el + ' .shadow').css('border-width', '0.1em');
    } else {
        $(el + ' .right-side').css('border-width', '0.5em');
        $(el + ' .left-side').css('border-width', '0.5em');
        $(el + ' .shadow').css('border-width', '0.5em');
    }
    $(el + ' .num').text(percent);
    $(el + ' .left-side').css('transform', 'rotate(' + deg + 'deg)');
}

  addOrdetSet(){
    console.log(this.credentials);
    console.log("patient id is "+this.route.snapshot.params['pid'])
    this.data.addOrderSerService(this.credentials, this.route.snapshot.params['pid']).subscribe(
      (data:any) =>{
        console.log("successful")
        console.log(data.resString)
        this.ordersetSuccess = data.resString
        setTimeout(()=>{                           //<<<---using ()=> syntax
          this.ordersetSuccess = "";
        }, 5000);
      },
      error=>{
        console.log(error)
        this.ordersetUnsuccess = "Order Addition Unsuccessul! Order Already present"
        setTimeout(()=>{                           //<<<---using ()=> syntax
          this.ordersetUnsuccess = "";
        }, 5000);
      }
    )
  }

  onMessagePatient() {
    this.router.navigate(['/patient-message', this.route.snapshot.params['pid']])
  }

  callOrderSet(){
      this.credentials.first="1"
      this.credentials.second="0"
      this.credentials.third="0"
      this.credentials.fourth="0"
      this.credentials.fifth="0"
      this.credentials.sixth="0"
      this.credentials.seventh="0"
      this.credentials.eight="0"
    this.orderIsavail = false
    this.data.getOrderService(this.route.snapshot.params['pid']).subscribe(
         (data:any)=>{
           this.credentials.second=data.orderset.second
           this.credentials.third=data.orderset.third
           this.credentials.fourth=data.orderset.fourth
           this.credentials.fifth=data.orderset.fifth
           this.credentials.sixth=data.orderset.sixth
           this.credentials.seventh=data.orderset.seventh
           this.credentials.eight=data.orderset.eight
           this.orderIsavail = true
           console.log("order Avail is "+this.orderIsavail)
           console.log("data is "+data)
           console.log("data second is "+data.orderset.second);
           console.log(this.credentials)
         },
       error=>{
           console.log(error.resString);
       }
       )
  }

  resetOrdetSet(){
    console.log(this.credentials);
    console.log("patient id is "+this.route.snapshot.params['pid'])
    this.data.resetOrderSerService(this.credentials, this.route.snapshot.params['pid']).subscribe(
      (data:any) =>{
        console.log("successful")
        console.log(data.resString)
        this.ordersetSuccess = data.resString
        setTimeout(()=>{                           //<<<---using ()=> syntax
          this.ordersetSuccess = "";
        }, 5000);
      },
      error=>{
        console.log(error)
        this.ordersetUnsuccess = "Order Reset Done!"
        setTimeout(()=>{                           //<<<---using ()=> syntax
          this.ordersetUnsuccess = "";
        }, 5000);
      }
    )
  }

}
