import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.scss']
})
export class QuizInstructionsComponent implements OnInit {
  checked: boolean;
  quizId: string;
  quiz: IProduct;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.quizId = res.quizId;
      this.productService.getProduct(2, this.quizId, true).then(res => {

        this.quiz = res;
      })
    })
  }

  onCheck(event) {
    this.checked = event.target.checked;
  }
  startQuiz() {
    if (!this.checked) {
      alert('Please accept Terms and condition');
    }
    this.router.navigate(['quiz-play', this.quizId]);
  }
}
