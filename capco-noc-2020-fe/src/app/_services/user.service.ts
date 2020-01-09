import { Injectable } from '@angular/core';
import {User} from "../_models/user";

declare function require(url: string);

@Injectable({ providedIn: 'root' })
export class UserService {

  private users: User[] = [];

  constructor() {
    this.users = this.processJsonDataToUsersList(this.getRawUsers()); // load users from storage
  }

  private getRawUsers(): Array<any> {
    // this SHOULD be replaced by REST call
    return require('../_mock-data/users.json');
  }

  public getUserById(id: number): User {
    // this may be replaced by REST call

    let userWithGivenId: User = undefined;
    this.users.forEach(user => {
      if ((user.id !== undefined || id !== undefined) && user.id === id) {
        userWithGivenId = user;
      }
    });

    if (userWithGivenId) {
      return userWithGivenId;
    } else {
      throw new Error("User with ID: " + id + " does not exist.");
    }
  }

  public getUserByToken(token: string): User {
    // this may be replaced by REST call

    let userWithGivenToken: User = undefined;
    this.users.forEach(user => {
      if ((user.token !== undefined || token !== undefined) && user.token === token) {
        userWithGivenToken = user;
      }
    });

    if (userWithGivenToken) {
      return userWithGivenToken;
    } else {
      throw new Error("User with token: " + token + " does not exist.");
    }
  }

  public getUserByUsernameAndPassword(username: string, password: string): User {
    // this may be replaced by REST call
    if (username && password) {
      let foundUser: User = undefined;
      this.users.forEach(user => {
        if (user.username == username && user.password == password) {
          foundUser = user;
          foundUser.token = this.getRandomToken();
        }
      });
      return foundUser;
    }
    throw new Error("Username and password can not be empty.");
  }

  private getRandomToken() {
    return Math.random().toString(36);
  }

  // Help method to convert JSON data to list of User objects
  private processJsonDataToUsersList(usersDataJson: any): User[] {
    let processedUsers: Array<User> = [];
    usersDataJson.forEach(userJson => {
      processedUsers.push(User.parseFromJson(
        userJson.id, userJson.username, userJson.password, userJson.firstName, userJson.lastName, userJson.birthDate, userJson.iban, userJson.token ? userJson.token : undefined));
    });
    return processedUsers;
  }
}
