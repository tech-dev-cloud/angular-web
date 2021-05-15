import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIS, AuthType } from 'src/app/common/constant';
import { CourseList } from 'src/app/common/mock/mock';
import { IQuiz, ProductType } from 'src/app/core/interfaces/quiz.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IProduct, ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss']
})
export class PDPComponent implements OnInit {

  productId: string;
  productType: ProductType;
  product: IProduct;
  category: string;
  course = CourseList.items[0];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private productService: ProductService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.productType = res.productType;
      this.productId = res.product_id;
      this.category = res.category
      if (this.productService.items) {
        this.productService.getProduct(this.category.split('-')[1], this.productId).then(res => {
          this.product = res;
        })
      } else {
        this.getProduct();
      }
    })
  }

  getProduct() {
    this.loaderService.show();
    this.httpService.getData(APIS.product, { product_ids: this.productId }).subscribe(res => {
      this.product = res.data[0].products[0];
      this.loaderService.hide();
    }, err => {
      this.loaderService.show();
    })
  }

  enroll() {

    if (this.authService.isLogIn) {
      this.loaderService.show();
      this.httpService.postData(APIS.payment, { productId: this.product._id })
        .subscribe((res: any) => {
          this.loaderService.hide();

          if (res.data && res.data.url) {
            let obj = window.open(res.data.url, '_blank');
          } else {
            if (!this.product.isPaid) {
              this.alertService.success('Product successfully added to you collection')
            }
          }
          // window.location.replace(res.url);
        }, err => {
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
