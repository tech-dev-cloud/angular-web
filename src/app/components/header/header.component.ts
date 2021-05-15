import { AuthService } from './../../core/services/auth.service';
import { APIS, AuthType, USER_DETAILS } from './../../common/constant';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() ratingEvent = new EventEmitter();
  @Input() ratingItem;
  authType = AuthType;
  userName: string;
  constructor(
    public authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.authService.authentication.subscribe(res => {

      if (res) {
        this.userName = this.authService.getUserData(USER_DETAILS.Name);
        if (this.userName) {
          this.userName = this.userName.split(' ')[0];
        }
      }
    })
  }

  authenticate(type: AuthType) {

    const modalRef = this.authService.login();
    modalRef.componentInstance.type = type;
    modalRef.result.then(res => {
      if (res && res.data) {
        this.authService.saveUserData(res.data);
        this.userName = this.authService.getUserData(USER_DETAILS.Name);
        this.userName = this.userName.split(' ')[0];
      }
    }, err => {
      console.log(err)
    })
  }

  logout() {
    this.httpService.getData(APIS.logout).subscribe(res => {
      this.authService.logout();
      this.alertService.success("Successfully logout")
    })
  }
  quizList() {
    this.router.navigateByUrl('/profile');
  }
  home() {
    this.router.navigateByUrl('')
  }
  leaveRating() {
    this.ratingEvent.emit();
  }
}
