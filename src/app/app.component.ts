import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';
  sessionData: boolean | undefined;
  constructor() {
    this.sessionData = localStorage.getItem('token') ? true : false
  }
}
