import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from 'src/app/core/interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: IComment;
  @Input() allowComment: boolean;
  @Input() rating: boolean;
  @Input() mainComment: boolean;
  @Input() reply: boolean;//true if curernt comment is reply of any post
  @Output() replyQuery = new EventEmitter();
  @Output() showComments = new EventEmitter();

  message: string;
  showTextField = false;
  isReply = false;
  // showComments: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onReply(action: 'click' | 'post' | 'cancel') {
    if (action == 'click') {
      this.isReply = true;
    } else if (action == 'cancel') {
      this.isReply = false;
    } else {
      this.isReply = false;
      this.replyQuery.emit({ message: this.message, parent_id: this.comment._id });
    }
    this.message = '';
  }
  viewReply(status?: boolean) {
    // this.showComments = status;
    this.showComments.emit(this.comment);
  }
}
