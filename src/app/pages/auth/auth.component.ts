import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { AuthType, ERRORS } from './../../common/constant';
import { AlertService } from './../../core/services/alert.service';
import { HttpService } from './../../core/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { APIS } from 'src/app/common/constant';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Input() type: AuthType;
  form: FormGroup;
  authType = AuthType;
  btnText: string;
  title: string;
  isSubmit: boolean;

  nameRegex = /^[a-zA-Z ]{2,30}/g;
  phoneRegex = /^[0-9]{10}/g;
  errors = _.cloneDeep(ERRORS);


  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    switch (this.type) {
      case AuthType.SIGNUP:
        this.initSignUpForm();
        break;
      case AuthType.LOGIN:
        this.initLoginForm()
        break;
    }
  }

  initLoginForm() {
    this.form.reset();
    this.isSubmit = false;
    this.btnText = 'Login';
    this.title = 'Login';
    this.type = this.authType.LOGIN;
    this.form.removeControl('name');
    this.form.removeControl('phoneNumber');
    this.form.addControl('password', new FormControl('', Validators.required));
  }

  initSignUpForm() {
    this.form.reset();
    this.isSubmit = false;
    this.btnText = 'Sign Up';
    this.title = 'Sign Up';
    this.type = this.authType.SIGNUP;
    this.form.addControl('password', new FormControl('', Validators.required));
    this.form.addControl('name', new FormControl('', Validators.required));
    this.form.addControl('phoneNumber', new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]));
  }

  initForgotForm() {
    this.form.reset();
    this.isSubmit = false;
    this.btnText = 'Submit';
    this.title = 'Forgot Password';
    this.type = this.authType.FORGOT;
    this.form.removeControl('name');
    this.form.removeControl('phoneNumber');
    this.form.removeControl('password');
  }

  closeModal(data?: any) {
    this.activeModal.close(data)
  }

  get controls() {
    return this.form.controls;
  }


  onSubmit() {
    this.isSubmit = true;
    if (this.form.invalid) {
      return;
    }
    let data = { ...this.form.value };
    let api = (this.type == this.authType.LOGIN) ? APIS.login : (this.type == this.authType.SIGNUP ? APIS.register : APIS.forgot);
    this.loaderService.show();
    this.httpService.postData(api, data).subscribe((res: any) => {
      this.loaderService.hide();
      if (this.type == this.authType.LOGIN) {
        this.closeModal(res);
      } else if (this.type == this.authType.SIGNUP) {
        this.alertService.success("Your account has successfully created");
        this.initLoginForm();
      } else {
        this.alertService.success(res.message);
        // this.closeModal();
      }
    }, err => {
      this.loaderService.hide();
      this.alertService.error(err.error.message)
    })
  }
}
