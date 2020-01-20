import {Inject, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AbstractService {
  
  public REST_API_BASE_URL: string;

  constructor(protected document: Document) {
    this.REST_API_BASE_URL = this.document.location.origin + "/api";
  }
}
