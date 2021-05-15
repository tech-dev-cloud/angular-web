import { Component, OnInit } from '@angular/core';
import { APIS } from 'src/app/common/constant';
import { IQuiz, ProductType } from 'src/app/core/interfaces/quiz.interface';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/services/app.service';
import { ProfileService } from './profile.service';
import { IProduct, ProductService } from 'src/app/core/services/product.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  slideConfigSmall = { items: 2.4, dots: false, nav: true, loop: false, autoHeight: false };

  constructor(
    private router: Router,
    private appService: AppService,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.slideConfigSmall.items = this.appService.isMobileResolution ? 2.4 : 4.4;
    this.productService.getEnrolledProducts();
  }
  onSelectQuiz(event: any) {
    let category_id = event.webURL.split("-")[1];
    if (category_id == 2) {

    }
    this.router.navigate(['/instructions', event.product._id])
  }
  onProductSelect(product: IProduct) {
    if (product.type == ProductType.QUIZ) {
      this.router.navigate(['/instructions', product._id]);
    } else if (product.type == ProductType.NOTES) {
      this.router.navigate([]).then(result => { window.open(`/doc-reader/${product._id}`, '_blank') });
    } else {
      this.router.navigate(['learn', product._id])
    }
  }
  onClickItem() {

  }
}
