import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: IProduct;
  @Input() enrolled: boolean;
  @Input() nameOnly: boolean;
  @Output() clickItem = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onClickItem() {
    this.clickItem.emit(this.product);
  }
}
