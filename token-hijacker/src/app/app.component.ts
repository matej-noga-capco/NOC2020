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

  async sendRequest(event: Event) {
    const response = await this.http.get('http://localhost:8080/api/user', {
      headers: {'x-auth-token': this.tokenValue}
    }).toPromise();
  }
}
