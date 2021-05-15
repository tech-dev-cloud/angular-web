import { IQuiz, AnswerAction, ISubject, IQuestion } from './../interfaces/quiz.interface';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { APIS } from 'src/app/common/constant';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizId: string;
  constructor(
    private httpService: HttpService,
  ) { }

  getQuizById() {
    return this.httpService.getData(`${APIS.quizPlay}${this.quizId}`)
  }

  saveAnswer(data) {
    return this.httpService.putData(APIS.performance, data);
  }
  
  pausePlay(data){
    return this.httpService.putData(`${APIS.performance}/status`, data);
  }
  
  submitQuiz(data){
    return this.httpService.putData(APIS.quizSubmit, data);
  }
}
