import { Injectable } from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConstantsHelper} from "../_helpers/constants.helper";

const REST_API_URL_AUTH = ConstantsHelper.REST_API_BASE_URL + "/login";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  login(data): Observable<any> {
    try {
      return this.httpClient.post(REST_API_URL_AUTH, data);
    } catch (error) {
      console.warn(error);
      return undefined;
    }
  }


  logout(): Observable<any> {
    this.isLoggedIn = false;
    return this.httpClient.get('/api/logout');
  }

  public setLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }

  public isAdminLoggedIn(): boolean {
    return this.isLoggedIn;
  }

}
