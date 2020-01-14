import { Injectable } from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "./user.service";

declare function require(url: string);

const LS_USER_TOKEN_KEY = "noc-2020-user-token";
const sha1 = require('sha1');

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUser: User;
  private initializationDone: boolean = false;

  constructor(private userService: UserService) {
  }

  private async loadCurrentUserFromLocalStorage(): Promise<User> {
    let localStorageCurrentUserToken = localStorage.getItem(LS_USER_TOKEN_KEY);
    if (localStorageCurrentUserToken) {
      try {
        this.currentUser = await this.userService.getUserByToken(localStorageCurrentUserToken);
        this.initializationDone = true;
        return new Promise<User>((resolve, reject) => {
          resolve(this.currentUser);
        });
      } catch (error) {
        console.warn(error);
        localStorage.removeItem(LS_USER_TOKEN_KEY);
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

  async login(username, password) {
    try {
      let loggingInUser = await this.userService.getUserByUsernameAndPassword(username, sha1(password))

      if (loggingInUser) {
        this.currentUser = loggingInUser;
        localStorage.setItem(LS_USER_TOKEN_KEY, loggingInUser.token);
        return this.currentUser;
      }
    } catch (error) {
      console.warn(error);
      return undefined;
    }
  }

  logout() {
    localStorage.removeItem(LS_USER_TOKEN_KEY);
    this.currentUser = undefined;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }
}
