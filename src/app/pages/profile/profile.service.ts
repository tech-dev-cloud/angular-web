import { Injectable } from '@angular/core';
import { APIS } from 'src/app/common/constant';
import { HttpService } from 'src/app/core/services/http.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IProduct } from '../../core/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // myProducts: { id: number, title: string, weburl: string, products: IProduct[] }[];
  myProducts:IProduct[]=[];
  constructor(
    private httpService: HttpService,
    private loaderService: LoaderService,

  ) { }
  getEnrolledProducts(){
    this.httpService.getData(APIS.product, { enrolled: true }).toPromise().then(res=>{
      res.data.forEach(element => {
        this.myProducts.push(...element.products)
      });
      console.log(this.myProducts);
    })
  }
}
