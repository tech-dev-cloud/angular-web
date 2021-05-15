import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIS } from 'src/app/common/constant';
import { HttpService } from 'src/app/core/services/http.service';
import { ProductType } from '../interfaces/quiz.interface';
import { LoaderService } from './loader.service';

export interface IProduct {
  _id: string;
  name: string;
  cover_image: string;
  heading: string;
  status: string;
  isPaid: boolean;
  price: number;
  description: string;
  discountPercent: number;
  strikeprice: number;
  totalEnrolled: number;
  image: any[];
  type: string;
  product_meta: any;
  similar_products: any[];
  priority: number;
  benefits: string[];
  rating: number;
  learning: string[];
  targetStudents: string[];
  requirements: string[];
  sub_products: IProduct[];
  validity: number;
  mentorInfo: { _id: string, name: string };
  docs: any;
  userReview: any;
  contents: IContent[];
  promo_video_url: string;
  purchaseStatus: boolean;
  weburl: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IContent {
  _id: string;
  title: string;
  duration: number;
  lectureCounts: number;
  lectures: ILecture[];
}
export interface ILecture {
  _id: string;
  title: string;
  description: string;
  isPreview: boolean;
  file_type: string;
  duration: number;
  url: string;
}
@Injectable()
export class ProductService {
  items: { id: number, title: string, weburl: string, products: IProduct[] }[] = [];
  products: IProduct[];
  enrolledProducts: { id: number, title: string, weburl: string, products: IProduct[] }[] = [];
  title: string;

  constructor(
    private httpService: HttpService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  async getAllProducts(params?: any, category_id?) {
    this.loaderService.show();
    let res: any = await this.httpService.getData(APIS.product, params).toPromise();
    this.loaderService.hide();
    this.items = res.data;
    if (category_id) {
      let obj = this.items.find(obj => obj.id == category_id);
      this.title = obj.title;
      this.products = obj.products;
    }
  }
  async getProduct(category_id, product_id: string, enrolled?: boolean) {
    let obj;
    if (!enrolled) {
      if (!this.items.length) {
        await this.getAllProducts();
      }
      obj = this.items.find(obj => obj.id == category_id);
    } else {
      if (!this.enrolledProducts.length) {
        await this.getEnrolledProducts();
      }
      obj = this.enrolledProducts.find(obj => obj.id == category_id);
    }
    return obj.products.find(product => product._id == product_id);
  }
  async addCategoryProduct(category_id) {
    if (!this.items.length) {
      await this.getAllProducts();
    }
    let obj = this.items.find(obj => obj.id == category_id);
    this.title = obj.title;
    this.products = obj.products;
  }
  async getEnrolledProducts() {
    this.loaderService.show();
    let res: any = await this.httpService.getData(APIS.product, { enrolled: true }).toPromise();
    this.loaderService.hide();
    this.enrolledProducts = res.data;
  }
  productRedirect(product) {
    if (product.type == ProductType.QUIZ) {
      this.router.navigate(['/instructions', product._id]);
    } else if (product.type == ProductType.NOTES) {
      this.router.navigate([]).then(result => { window.open(`/doc-reader/${product._id}`, '_blank') });
    } else {
      this.router.navigate(['learn', product._id])
    }
  }
}
