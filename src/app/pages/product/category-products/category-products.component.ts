import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public productService: ProductService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (res) => {
      let obj = res.category.split('-')[1];
      if (!this.productService.items) {
        this.productService.getAllProducts({}, obj);
      } else {

        this.productService.addCategoryProduct(obj)
      }
    })
  }
  onProductSelect(product: IProduct) {
    this.router.navigate(['', product.weburl, product._id]);
  }

}
