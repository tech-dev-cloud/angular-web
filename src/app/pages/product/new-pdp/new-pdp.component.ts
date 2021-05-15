import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { APIS, AuthType } from 'src/app/common/constant';
import { CourseList } from 'src/app/common/mock/mock';
import { VideoPlayerComponent } from 'src/app/components/video-player/video-player.component';
import { ECommentType, IComment } from 'src/app/core/interfaces/comment.interface';
import { ProductType } from 'src/app/core/interfaces/quiz.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AppService } from 'src/app/core/services/app.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ILecture, IProduct, ProductService } from 'src/app/core/services/product.service';
import { NavFregment } from '../../course-play/course-play.service';

@Component({
  selector: 'app-new-pdp',
  templateUrl: './new-pdp.component.html',
  styleUrls: ['./new-pdp.component.scss', '../../../../assets/css/common.scss']
})
export class NewPdpComponent implements OnInit {

  productId: string;
  productType: ProductType;
  product: IProduct;
  category: string;
  fragmentType: NavFregment;
  course = CourseList.items[0];
  allowComment: boolean;
  reviews: IComment[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    public appService: AppService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.productType = res.productType;
      this.productId = res.product_id;
      this.category = res.category
      this.fragmentType = NavFregment.about;
      // if (this.productService.items) {
      //   this.productService.getProduct(this.category.split('-')[1], this.productId).then(res => {
      //      
      //     this.product = res;
      //   })
      // } else {
      this.getProduct();
      this.getProductReview({ type: ECommentType.product_review, object_id: this.productId })
      // }
    })
  }

  getProduct() {
    this.loaderService.show();
    this.httpService.getData(`${APIS.get_product}/${this.productId}`).subscribe(res => {
      this.product = res.data;
      this.loaderService.hide();
    }, err => {
      this.loaderService.show();
    })
  }
  getProductReview(data?) {
    this.httpService.getData(APIS.review, data).subscribe(res => {
      this.reviews = res.data.comments;
    })
  }
  onClickPreview() {
    if (this.product.promo_video_url) {
      // let url = "https://player.vimeo.com" + this.product.promo_video_url;
      let url = "https://player.vimeo.com/video/535195584";// + this.product.promo_video_url;
      this.startVideo(url);
    }
  }
  onClickLecture(lecture: ILecture) {
    if (lecture.isPreview) {
      let url = "https://player.vimeo.com" + lecture.url;
      this.startVideo(url);
    }
  }
  startVideo(url: string) {
    let obj = this.modalService.open(VideoPlayerComponent, { centered: true, size: 'lg' });
    obj.componentInstance.video_url = url;
    obj.componentInstance.contents = (this.product.contents && this.product.contents.length) ? this.product.contents : null;
  }
  enroll() {
    if (this.authService.isLogIn) {
      if (this.product.purchaseStatus) {
        this.productService.productRedirect(this.product);
        // this.router.navigate(['learn', this.productId]);
      } else {
        this.loaderService.show();
        this.httpService.postData(APIS.payment, { productId: this.productId })
          .subscribe((res: any) => {
            this.loaderService.hide();
            if (res.data && res.data.url) {
              let obj = window.open(res.data.url, '_blank');
            } else {
              if (!this.product.isPaid) {
                this.alertService.success('Enrolled successfully')
              }
            }

          }, err => {
            this.loaderService.hide();
            this.alertService.error(err.error.message)
          })
      }
    } else {
      const modalRef = this.authService.login();
      modalRef.componentInstance.type = AuthType.LOGIN;
      modalRef.result.then(res => {
        this.authService.saveUserData(res.data)
      })
    }
  }
  get totalLecture() {
    return this.product.contents.reduce((accumulator, content) => accumulator + content.lectureCounts, 0);
  }
  get totalCourseDuration() {
    return this.product.contents.reduce((accumulator, content) => accumulator + content.duration, 0);
  }
  get rating() {
    return `${Math.ceil(this.product.rating)}.0`;
  }
  onProductSelect(product: IProduct) {
    this.router.navigate(['', product.weburl, product._id]);
  }
  showFregment(type: NavFregment) {
    this.fragmentType = type;
  }
  showAllComments(comment: IComment) {
    this.allowComment = true
  }
  backToAllComments() {
  }
}
