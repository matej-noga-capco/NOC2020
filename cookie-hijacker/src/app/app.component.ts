import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public cookies: any;
  title = 'cookie-hijacker';

  constructor(private cookieService: CookieService) {
  }

  public onRunHijacking(): void {
    this.cookies = this.cookieService.getAll();
  }
}
