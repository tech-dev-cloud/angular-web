import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIS } from 'src/app/common/constant';
import { IQuiz } from 'src/app/core/interfaces/quiz.interface';
import { AppService } from '../../core/services/app.service';
import { HttpService } from 'src/app/core/services/http.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IProduct, ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  images = [
    "https://eduseeker-image-bucket.s3.amazonaws.com/s1/1599934479653rrb.webp",
    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",
    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",

    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",
    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",
    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",
    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",
    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",
    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",
    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",
    "https://images.myloapp.in/gullack_products/product_1603474945_1888793218.webp",
  ]
  slideConfigSmall = { items: 2.4, dots: false, nav: true, loop: false, autoHeight: false };

  constructor(
    private router: Router,
    private httpService: HttpService,
    private loaderService: LoaderService,
    private appService: AppService,
    public productService: ProductService,

  ) { }

  async ngOnInit() {
    if (!this.productService.items || !this.productService.items.length) {
      this.productService.getAllProducts();
    }
    this.slideConfigSmall.items = this.appService.isMobileResolution ? 2 : 5;
  }

  onSelectQuiz(quiz: IQuiz) {
    this.router.navigate(['', quiz.productType, quiz._id])
  }
  calculateDiscount(product: IProduct) {
    let discount = (product.strikeprice - product.price) * 100 / product.strikeprice;
    return Math.round(discount);
  }
  seeAll(web_url: string) {
    this.router.navigate(['', web_url])
  }
  onItemSelect(product: IProduct) {
    this.router.navigate(['', product.weburl, product._id])
  }
}
