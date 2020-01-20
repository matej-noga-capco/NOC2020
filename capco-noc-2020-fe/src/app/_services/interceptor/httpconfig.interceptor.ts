import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from '../error.service';
import {ConstantsHelper} from "../../_helpers/constants.helper";

@Injectable({
    providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private errorService: ErrorService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = sessionStorage.getItem(ConstantsHelper.LS_USER_TOKEN_KEY);

        if (token) {
            request = request.clone({ headers: request.headers.set('x-auth-token', token) });
        } else {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded') });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.headers.get('x-auth-token')) {
                    sessionStorage.setItem(ConstantsHelper.LS_USER_TOKEN_KEY, event.headers.get('x-auth-token'));
                    this.errorService.unauthorized.next(false);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.errorService.checkStatus(error);
                return throwError(error);
            })
        );
    }
}
