import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IProduct } from '../../core/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() products:IProduct[];
  @Input() webURL:string;
  @Input() enrolled:Boolean;
  @Input() nameOnly:Boolean;
  @Output() onProductSelect= new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  onClickItem(event){
    this.onProductSelect.emit(event);
  }
}
