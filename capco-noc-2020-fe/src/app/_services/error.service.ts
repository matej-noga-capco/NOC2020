import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  
  public unauthorized: Subject<boolean> = new Subject()
  constructor() { }

  checkStatus(error: HttpErrorResponse) { 
    if(error.status === 401) { 
      this.unauthorized.next(true);
    }
  }
}
