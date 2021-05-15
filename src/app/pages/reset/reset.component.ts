import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { HttpService } from 'src/app/core/services/http.service';
import { APIS } from 'src/app/common/constant';
import { ERRORS } from './../../common/constant';
import { MustMatch } from 'src/app/common/function';
import { AlertService } from 'src/app/core/services/alert.service';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  form:FormGroup;
  token:string;
  isSubmit:boolean;
  err:string;
  errors = _.cloneDeep(ERRORS);
  success:boolean;

  constructor(
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder,
    private httpService:HttpService,
    private alertService:AlertService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res=>{
      this.token=res.token
    })
    this.initForm();
  }

  initForm(){
    this.form=this.fb.group({
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  onSubmit(){
    this.isSubmit=true;
    if(this.form.invalid){
      this.err=null;
      return;
    }
    if(this.form.value.password!=this.form.value.confirmPassword){
      this.err="Password should be match";
      return;
    }
    this.httpService.postData(APIS.reset,{token:this.token, password:this.form.value.password})
      .subscribe(res=>{
        this.success=true;
      },err=>{
        this.alertService.error(err.error.message)
      })
  }
  get controls(){
    return this.form.controls;
  }
  home(){
    this.router.navigateByUrl('')
  }

}
