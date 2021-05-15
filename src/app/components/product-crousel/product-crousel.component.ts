import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import { ProductService } from 'src/app/pages/product/product.service';
import { OwlCarousel } from 'ngx-owl-carousel';
import { IProduct } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-crousel',
  templateUrl: './product-crousel.component.html',
  styles: [`
    .owl-item{
      
    }
  `]
})
export class ProductCrouselComponent implements OnInit {
  @Input() category: any;
  @Input() options: any;
  @Output() clickItem = new EventEmitter();
  @ViewChild('owlElement') owlElement: OwlCarousel
  // @Output() seeAllEvent=new EventEmitter();
  constructor(
    // public productService:ProductService
  ) { }

  ngOnInit(): void {
  }
  seeAll(web_url) {
    // this.seeAllEvent.emit(web_url)
  }
  onClickItem(product: IProduct) {
    this.clickItem.emit(product);
  }
  next(event) {
    console.log(event);
    this.owlElement.next([400])
  }
}
