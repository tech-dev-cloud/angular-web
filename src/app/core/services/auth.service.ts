import { AuthComponent } from './../../pages/auth/auth.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { USER_DETAILS } from './../../common/constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    name: string;
    // email: string;
    UserDetails = { ...USER_DETAILS };
    isLogIn: boolean;
    authentication = new Subject();

    constructor(
        private router: Router,
        private modalService: NgbModal
    ) {
        this.isAuthenticated()
    }

    isAuthenticated(): boolean {
        this.authentication.next(true);
        if (localStorage.getItem(this.UserDetails.Token)) {
            this.name = localStorage.getItem(this.UserDetails.Name).split(' ')[0];
            this.isLogIn = true;
            return true;
        }
        this.isLogIn = false;
        return false;
    }

    /** Save User data locally after login */
    saveUserData(userData) {

        this.name = userData[this.UserDetails.Name] || '';
        localStorage.setItem(this.UserDetails.Token, userData[this.UserDetails.Token]);
        localStorage.setItem(this.UserDetails.Name, userData[this.UserDetails.Name]);
        this.name = localStorage.getItem(this.UserDetails.Name).split(' ')[0];
        this.isLogIn = true;
        this.authentication.next(true);
    }

    initAuthUser() {
        if (this.isAuthenticated()) {
            let userData = localStorage.getAll();
            this.name = userData.name;
            // this.email = userData[this.UserDetails.Email];
        } else {
        }
        return true;
    }

    getUserData(key: string) {
        return localStorage.getItem(key);
    }

    logout() {
        localStorage.clear();
        this.isLogIn = false;
        this.authentication.next(true);
        this.router.navigateByUrl('');
    }

    login() {
        return this.modalService.open(AuthComponent, { centered: true, size: 'lg' })
    }

}