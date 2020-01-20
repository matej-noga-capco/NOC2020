import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AbstractService} from "./abstract.service";
import {DOCUMENT} from "@angular/common";


@Injectable({ providedIn: 'root' })
export class AuthenticationService extends AbstractService {

  private readonly REST_API_URL_AUTH: string;
  private isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) protected document: Document) {
    super(document);
    this.REST_API_URL_AUTH = this.REST_API_BASE_URL + "/login";
  }

  login(data): Observable<any> {
    try {
      return this.httpClient.post(this.REST_API_URL_AUTH, data);
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
