import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { defaultToken, USER_DETAILS } from '../../common/constant';
import { LoaderService } from './../services/loader.service';
import { AlertService } from './../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    constructor(
        public router: Router,
        public authService: AuthService,
        public alertService: AlertService,
        private loaderService: LoaderService
    ) { }

    /** Request interceptor **/
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            const token = this.authService.getUserData(USER_DETAILS.Token);
            req = req.clone({ headers: req.headers.set('authorization', token) });
        }
        req = req.clone({ headers: req.headers.set('web-app', "true") });

        // this.loaderService.show();
        this.requests.push(req);

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.removeRequest(req);
                }
            }, (err: any) => {
                this.removeRequest(req);
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 0) {
                        this.alertService.error('Network error!');
                    }
                    else if (err.status === 401) {
                        this.authService.logout();
                        // localStorage.clear();
                        // we need to clear cookie here
                        this.alertService.error('Your session has been expired. Please login again');
                    }
                }
            })
        );
    }
    /** Remove request **/
    removeRequest(req: HttpRequest<any>) {
        // this.loaderService.hide();
        const i = this.requests.indexOf(req);
        this.requests.splice(i, 1);
    }
}