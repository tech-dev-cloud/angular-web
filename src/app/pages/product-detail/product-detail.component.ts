import { AuthType } from './../../common/constant';
import { AuthService } from './../../core/services/auth.service';
import { IQuiz, ProductType } from './../../core/interfaces/quiz.interface';
import { HttpService } from './../../core/services/http.service';
import { CourseList } from './../../common/mock/mock';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIS } from 'src/app/common/constant';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string;
  productType: ProductType;
  product: IQuiz;
  course = CourseList.items[0];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService,
    private router:Router,
    private loaderService:LoaderService,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.productType = res.productType;
      this.productId = res.productId;
      this.getProduct();
    })
  }

  getProduct() {
    this.loaderService.show();
    this.httpService.getData(`${APIS.quiz}/${this.productId}`).subscribe(res => {
      this.product = res;
      this.loaderService.hide();
    },err=>{
      this.loaderService.show();
    })
  }

  enroll() {
    if (this.authService.isLogIn) {
      this.loaderService.show();
      this.httpService.postData(APIS.payment, { productId: this.product._id, productType: this.product.productType })
        .subscribe((res: any) => {
          this.loaderService.hide();
          if(res.url){
            window.open(res.url, '_blank')
          }else{
            this.router.navigateByUrl('/profile')
          }
          // window.location.replace(res.url);
        }, err=>{
          this.loaderService.hide();
          this.alertService.error(err.error.message)
        })
    } else {
      const modalRef = this.authService.login();
      modalRef.componentInstance.type = AuthType.LOGIN;
      modalRef.result.then(res => {
        this.authService.saveUserData(res)
      })
    }
  }

}
