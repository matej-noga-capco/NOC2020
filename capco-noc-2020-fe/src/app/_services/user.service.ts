import {Inject, Injectable} from '@angular/core';
import {User} from "../_models/user";
import {HttpClient} from "@angular/common/http";
import {AbstractService} from "./abstract.service";
import {DOCUMENT} from "@angular/common";


@Injectable({ providedIn: 'root' })
export class UserService extends AbstractService {

  private readonly REST_API_URL_USERS: string;

  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) protected document: Document) {
    super(document);
    this.REST_API_URL_USERS = this.REST_API_BASE_URL + "/user";
  }

  public getUsers(): Promise<User[]> {
    return this.httpClient.get<User[]>(this.REST_API_URL_USERS).toPromise();
  }

  public async getUserById(id: number): Promise<User> {
    return this.httpClient.get<User>(this.REST_API_URL_USERS+"/"+id).toPromise();
  }

  private getRandomToken() {
    return Math.random().toString(36);
  }
}
