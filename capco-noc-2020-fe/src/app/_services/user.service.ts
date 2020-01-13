import { Injectable } from '@angular/core';
import {User} from "../_models/user";
import {HttpClient} from "@angular/common/http";
import {ConstantsHelper} from "../_helpers/constants.helper";

const REST_API_URL_USERS = ConstantsHelper.REST_API_BASE_URL + "/user";

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public getUsers(): Promise<User[]> {
    return this.httpClient.get<User[]>(REST_API_URL_USERS).toPromise();
  }

  public async getUserById(id: number): Promise<User> {
    return this.httpClient.get<User>(REST_API_URL_USERS+"/"+id).toPromise();
  }

  public async getUserByToken(token: string): Promise<User> {
    return this.getUsers().then(users => {
      let userWithGivenToken: User = undefined;
      users.forEach(user => {
        if ((user.token !== undefined || token !== undefined) && user.token === token) {
          userWithGivenToken = user;
        }
      });

      if (userWithGivenToken) {
        return userWithGivenToken;
      } else {
        return undefined;
      }
    });
  }

  public async getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    return this.getUsers().then(users => {
      if (username && password) {
        let foundUser: User = undefined;
        users.forEach(user => {
          if (user.username == username && user.password == password) {
            foundUser = user;
            foundUser.token = this.getRandomToken();
          }
        });
        return foundUser;
      }
      throw new Error("Username and password can not be empty.");
    });
  }

  private getRandomToken() {
    return Math.random().toString(36);
  }
}
