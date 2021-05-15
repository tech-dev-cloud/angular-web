import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss']
})
export class RatingModalComponent implements OnInit {

  @Output() onRatingSubmit = new EventEmitter();
  rating: number;
  review: string;
  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }
  submitRating() {
    this.closeModal({ rating: this.rating, message: this.review });
  }
  closeModal(data?) {
    this.activeModal.close(data);
  }
}
