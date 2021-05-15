import { HttpService } from './../../core/services/http.service';
import { IQuiz } from './../../core/interfaces/quiz.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIS } from 'src/app/common/constant';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  quizzes: IQuiz[];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private loaderService:LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.httpService.getData(APIS.quiz).subscribe(res => {
      this.loaderService.hide();
      this.quizzes = res.items;
    },err=>{
      this.loaderService.hide();
    })
  }

  onSelectQuiz(quiz: IQuiz) {
    this.router.navigate(['', quiz.productType, quiz._id])
  }
}
