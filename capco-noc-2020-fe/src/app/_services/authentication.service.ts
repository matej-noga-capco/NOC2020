import { Injectable } from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConstantsHelper} from "../_helpers/constants.helper";

const REST_API_URL_AUTH = ConstantsHelper.REST_API_BASE_URL + "/login";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUser: User;
  private initializationDone: boolean = false;

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  private async loadCurrentUserFromLocalStorage(): Promise<User> {
    let localStorageCurrentUserToken = localStorage.getItem(ConstantsHelper.LS_USER_TOKEN_KEY);
    if (localStorageCurrentUserToken) {
      try {
        this.currentUser = await this.userService.getUserByToken(localStorageCurrentUserToken);
        this.initializationDone = true;
        return new Promise<User>((resolve, reject) => {
          resolve(this.currentUser);
        });
      } catch (error) {
        console.warn(error);
        localStorage.removeItem(ConstantsHelper.LS_USER_TOKEN_KEY);
      }
    }
  }

  public async isLoggedIn(): Promise<boolean> {

    let currentUser: User;
    if (!this.initializationDone) {
      currentUser = await this.loadCurrentUserFromLocalStorage();
    } else {
      currentUser = this.currentUser;
    }

    if (currentUser) {
      return true;
    } else {
      return false;
    }
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
    localStorage.removeItem(ConstantsHelper.LS_USER_TOKEN_KEY);
    this.currentUser = undefined;
    return this.httpClient.get('/api/logout');
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }
}
