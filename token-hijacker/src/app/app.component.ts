import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'token-hijacker';
  tokenValue: any = '';

  constructor(private http: HttpClient) {
  }

  sendRequest(event: Event) {
    sessionStorage.setItem("token", this.tokenValue);
    this.http.get('http://localhost:8080/api/user').subscribe(res => {
      alert(res);
    });
  }
}
