import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { IProduct, ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-doc-reader',
  templateUrl: './doc-reader.component.html',
  styleUrls: ['./doc-reader.component.scss']
})
export class DocReaderComponent implements OnInit {
  doc_id:string;
  product:IProduct;
  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res=>{
      this.doc_id=res.doc_id;
      if(this.doc_id){
        this.productService.getProduct(3, this.doc_id, true).then(res=>{
          this.product=res;
        });
      }
    })
  }

  download(){
    saveAs(this.product.docs[0].url, this.product.docs[0].filename)
  }
}
