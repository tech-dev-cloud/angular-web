import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { APIS } from 'src/app/common/constant';
import { ECommentType, IComment } from 'src/app/core/interfaces/comment.interface';
import { AppService } from 'src/app/core/services/app.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ILecture, IProduct } from 'src/app/core/services/product.service';
import { RatingModalComponent } from 'src/app/modals/rating-modal/rating-modal.component';
import { NavFregment } from './course-play.service';

@Component({
  selector: 'app-course-play',
  templateUrl: './course-play.component.html',
  styleUrls: ['./course-play.component.scss']
})
export class CoursePlayComponent implements OnInit {
  productId: string;
  product: IProduct;
  arr = [1, 2, 3, 5, 7];
  fragmentType: NavFregment;
  askQuestion: boolean;
  message: string;
  allComments: IComment[] = [];
  commentArr: IComment[];
  currentLecture: ILecture;
  mainComment: IComment;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    public appService: AppService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.productId = res.id;
      if (this.productId) {
        this.httpService.getData(`${APIS.get_product}/${this.productId}`, { enrolled: true }).subscribe(res => {
          this.product = res.data;
          this.currentLecture = this.product.contents[0].lectures[0];
        }, err => {
          this.router.navigate(['/', err.error.data.weburl, this.productId])
        })
        this.httpService.getData(APIS.review, { object_id: this.productId, type: 'lecture_query' }).subscribe(res => {
          this.allComments = res.data.comments;
          this.commentArr = [...this.allComments];
          debugger
        })
      }
    })
    if (this.appService.isMobileResolution) {
      this.fragmentType = NavFregment.content;
    } else {
      this.fragmentType = NavFregment.about;
    }
  }
  showFregment(type: NavFregment) {
    this.fragmentType = type;
  }
  onAskQuestion(action: 'click' | 'cancel' | 'post') {
    if (action == 'cancel') {
      this.askQuestion = false;
    } else if (action == 'click') {
      this.askQuestion = true;
    } else {
      this.askQuestion = false;
      let data = { message: this.message, type: 'lecture_query', object_id: this.productId };
      if (this.mainComment) {
        data['parent_id'] = this.mainComment._id;
      }
      this.postComment(data);
    }
  }
  onReply(event) {
    if (event.message) {
      let data = { ...event, type: 'lecture_query', object_id: this.productId }
      this.postComment(data);
    }
  }
  postComment(data) {
    this.httpService.postData(APIS.review, data).subscribe((res: any) => {
      if (data.parent_id) {
        let parent_comment = this.allComments.find(comment => comment._id == data.parent_id);
        if (parent_comment && parent_comment.commentData) {
          parent_comment.commentData.push(res.data);
          // parent_comment.commentData.splice(0, 0, res.data);
        } else {
          parent_comment.commentData = [res.data];
        }
        parent_comment.commentCounts = parent_comment.commentData.length;
      } else {
        this.allComments.push(res.data);
        this.commentArr.push(res.data);
        // this.allComments.splice(0, 0, res.data);
        // this.commentArr.splice(0, 0, res.data);
      }
    })
  }
  playLecture(lecture: ILecture) {
    if (this.currentLecture._id == lecture._id) {
      return;
    }
    this.currentLecture = lecture;
  }
  showComments(comment: IComment) {
    this.mainComment = comment;
    this.commentArr = comment.commentData;
  }
  backToAllComments() {
    this.mainComment = null;
    this.commentArr = [...this.allComments];
  }
  giveRating() {
    this.modalService.open(RatingModalComponent).result.then(res => {
      if (res) {
        this.httpService.postData(APIS.review, { ...res, object_id: this.productId, type: ECommentType.product_review }).subscribe(res => {

        })
      }
    });
  }
}
