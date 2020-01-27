import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'cookie-hijacker';

  executePostCall() {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
        if (xmlhttp.status === 200) {
          alert('200');
        } else if (xmlhttp.status === 400) {
          alert('There was an error 400');
        } else {
          alert('something else other than 200 was returned');
        }
      }
    };

    xmlhttp.open("GET", "https://localhost:8080/api/transaction", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send("date=2019-01-15T08:09:12&payer=1&receiver=2&amount=999");
  }
}
