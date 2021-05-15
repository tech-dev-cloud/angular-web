import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { AnswerAction, IQuestion, IQuiz, ISubject, IAnswer, IOngoingQuiz, ITimer, QuizStatus, Result } from './../../core/interfaces/quiz.interface';
import { APIS, USER_DETAILS } from './../../common/constant';
import { AuthService } from './../../core/services/auth.service';
import { QuizService } from './../../core/services/quiz.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { RatingModalComponent } from 'src/app/modals/rating-modal/rating-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ECommentType } from 'src/app/core/interfaces/comment.interface';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss']
})
export class QuizPlayComponent implements OnInit {
  userName: string;
  quizProgress: IOngoingQuiz;
  quiz: IQuiz;
  subject: ISubject;
  questions: IQuestion[];
  selectedOption;
  answers: IAnswer[] = [];
  answerAction = AnswerAction;
  currentQuestion: IQuestion;
  currentIndex: number = 0;
  timerId: any;
  timer: ITimer;
  timesUp: boolean;
  product: any;
  counts = {
    notVisited: 0,
    answered: 0,
    notAnswered: 0,
    markForReview: 0,
    answerReview: 0
  }

  result: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public quizService: QuizService,
    private authSrvice: AuthService,
    private alertService: AlertService,
    private httpService: HttpService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.userName = this.authSrvice.getUserData(USER_DETAILS.Name);
    this.activatedRoute.params.subscribe(res => {
      this.quizService.quizId = res.quizId;

      if (this.quizService.quizId) {
        this.quizService.getQuizById().subscribe(res => {
          this.quiz = res.data;
          this.quizProgress = null;
          this.product = res.data.product;
          // this.subject = this.quiz.subjectData;

          // this.min = this.quiz.attemptTime - 1;
          if (!this.quizProgress) {
            this.questions = res.data.questions.map(question => ({ ...question, attemptStatus: AnswerAction.NOT_VISITED }));
            this.currentQuestion = this.questions[0];
            this.timer = {
              hours: Math.floor(this.product.product_meta.time_limit / 60),
              minutes: (this.product.product_meta.time_limit - (Math.floor(this.product.product_meta.time_limit / 60) * 60)) - 1,
              seconds: 59
            }
            this.quizProgress = {
              status: QuizStatus.IN_PROGRESS
            }
            this.counts.notVisited = this.questions.length - 1;
            this.counts.notAnswered = 1;
            this.currentQuestion.attemptStatus = AnswerAction.NOT_ANSWERED;
            this.startTimer();
          } else {
            this.timer = this.quizProgress.remainingTime;
            let tempData = _.cloneDeep(this.quizProgress.userAnswers);
            tempData = _.keyBy(tempData, 'question_id');
            this.questions = res.questions.map(question => {
              let obj = {
                ...question,
                attemptStatus: (tempData[question._id]) ? tempData[question._id].status : AnswerAction.NOT_VISITED,
                answer: (tempData[question._id]) ? tempData[question._id].answer[0] : undefined
              }
              this.setCounts(null, obj.attemptStatus);
              return obj;
            })
            this.currentQuestion = this.questions[0];
            this.selectedOption = this.currentQuestion.answer[0]
            if (this.quizProgress.status == QuizStatus.IN_PROGRESS) {
              this.answers = this.quizProgress.userAnswers;
              this.startTimer();
            } else if (this.quizProgress.status == QuizStatus.ON_HOLD) {
              this.answers = this.quizProgress.userAnswers;
              this.startTimer();
            } else if (this.quizProgress.status == QuizStatus.COMPLETED) {
              this.startTimer();
            }
          }
        });
      }

    })
  }



  startTimer() {
    this.timerId = setInterval(() => {
      this.timer.seconds--;
      if (this.timer.hours <= 0 && this.timer.minutes <= 0 && this.timer.seconds <= 0) {
        clearInterval(this.timerId);
        //  TODO: operation after time complete
        this.timesUp = true;
        this.submitQuiz();
        return;
      }
      if (this.timer.minutes < 0) {
        this.timer.hours--;
        this.timer.minutes = 59;
      }
      if (this.timer.seconds < 0) {
        this.timer.minutes--;
        this.timer.seconds = 59;
      }
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.timerId);
  }

  addControl(index, value) {
    // this.answer.addControl(index, new FormControl());
  }

  onQuestionChange(question: IQuestion, index: number) {
    this.currentQuestion = question;
    this.selectedOption = (this.currentQuestion.answer || [])[0];
    this.currentIndex = index;
    if (this.currentQuestion.attemptStatus === AnswerAction.NOT_VISITED) {
      this.setCounts(this.currentQuestion.attemptStatus, AnswerAction.NOT_ANSWERED);
      this.currentQuestion.attemptStatus = AnswerAction.NOT_ANSWERED
    }
  }

  prevQuestion() {
    if (this.currentIndex == 0) {
      return;
    }
    this.currentIndex = this.currentIndex - 1;
    this.currentQuestion = this.questions[this.currentIndex];
    this.selectedOption = (this.currentQuestion.answer || [])[0];
    if (this.currentQuestion.attemptStatus === AnswerAction.NOT_VISITED) {
      this.setCounts(this.currentQuestion.attemptStatus, AnswerAction.NOT_ANSWERED);
      // this.saveAnswer(AnswerAction.NOT_ANSWERED);
      this.currentQuestion.attemptStatus = AnswerAction.NOT_ANSWERED
    }
  }
  nextQuestion() {
    if (this.currentIndex == this.questions.length - 1) {
      return;
    }
    this.currentIndex = this.currentIndex + 1;
    this.currentQuestion = this.questions[this.currentIndex];
    this.selectedOption = (this.currentQuestion.answer || [])[0];
    if (this.currentQuestion.attemptStatus === AnswerAction.NOT_VISITED) {
      this.setCounts(this.currentQuestion.attemptStatus, AnswerAction.NOT_ANSWERED);
      this.currentQuestion.attemptStatus = AnswerAction.NOT_ANSWERED;
      this.selectedOption = null;
    }
  }

  getResultClass(question: IQuestion) {
    let obj = this.quizProgress.userAnswers.find(obj => obj.question_id == question._id);
    if (obj) {
      switch (obj.resultStatus) {
        case Result.CORRECT:
          return 'ans';
        case Result.INCORRECT:
          return 'not-ans';
        case Result.NOT_ATTEMPT:
          return 'not-visit';
      }
    }
    return 'not-visit'
  }

  saveAnswer(status: AnswerAction) {
    if ((status == AnswerAction.SAVE_MARK_FOR_REVIEW || status == AnswerAction.ANSWERED) && !this.selectedOption) {
      alert('Please select your answer.')
      return;
    }
    let data = {
      product_id: this.quizService.quizId,
      userAnswers: {
        question_id: this.currentQuestion._id,
        answer: [this.selectedOption],
        status: status
      },
      remainingTime: {
        hours: this.timer.hours,
        minutes: this.timer.minutes,
        seconds: this.timer.seconds
      }
    }
    if (status == AnswerAction.MARK_FOR_REVIEW) {
      delete data.userAnswers.answer;
    }
    this.setCounts(this.currentQuestion.attemptStatus, data.userAnswers.status);
    this.currentQuestion.attemptStatus = data.userAnswers.status;
    this.currentQuestion.answer = data.userAnswers.answer;
    this.nextQuestion();
    this.quizService.saveAnswer(data).subscribe((res: any) => {
      this.answers = res.data.userAnswers;
      // let index = res.data.userAnswers.findIndex(obj => obj.question_id == this.currentQuestion._id);
      // this.setCounts(this.currentQuestion.attemptStatus, res.data.userAnswers[index].status);
      // this.currentQuestion.attemptStatus = res.data.userAnswers[index].status;
      // this.currentQuestion.answer = res.data.userAnswers[index].answer;
      // this.nextQuestion();
    })
  }

  pausePlay() {
    let data = {
      product_id: this.quizService.quizId,
      status: (this.quizProgress.status == 'in_progress') ? 'on_hold' : 'in_progress',
      remainingTime: {
        hours: this.timer.hours,
        minutes: this.timer.minutes,
        seconds: this.timer.seconds
      }
    }
    this.quizService.pausePlay(data).subscribe((res: any) => {
      this.quizProgress.status = (this.quizProgress.status == QuizStatus.IN_PROGRESS) ? QuizStatus.ON_HOLD : QuizStatus.IN_PROGRESS;
      if (this.quizProgress.status == 'in_progress') {
        this.startTimer()
      } else {
        this.stopTimer();
      }
    })
  }

  async submitQuiz() {
    if (this.answers.length == 0) {
      if (this.timesUp) {
        await this.alertService.simpleAlert('Unable to submit quiz due to zero attempt of question.', 'Time is over');
        return;
      }
      await this.alertService.simpleAlert("You can't submit quiz without attempt.")
      return;
    }
    let data = {
      product_id: this.product._id,
      remainingTime: this.timer
    }
    this.quizService.submitQuiz(data).subscribe((res: any) => {
      this.result = { ...res.data };
      this.quizProgress['userAnswers'] = this.result.userAnswers;
      let tempData = _.cloneDeep(this.quizProgress.userAnswers);
      tempData = _.keyBy(tempData, 'question_id');
      this.stopTimer();
      this.questions = this.questions.map(question => {
        let obj = {
          ...question,
          attemptStatus: (tempData[question._id]) ? tempData[question._id].status : AnswerAction.NOT_VISITED,
          answer: (tempData[question._id]) ? tempData[question._id].answer[0] : undefined
        }
        return obj;
      })
      this.currentQuestion = this.questions[0];
      this.currentIndex = 0;
    })
  }

  isCorrect(index) {
    if (this.result) {
      if (this.result.questionsWithAns[this.currentQuestion._id].correctOption[0] == (index + 1)) {
        return 'correct';
      }
      if (this.currentQuestion.answer && this.currentQuestion.answer[0] == (index + 1)) {
        return 'wrong'
      }
      return ''
    }
    return null;
  }

  clear() {
    // this.answer.setValue({ answer: '' })
  }

  setCounts(preStatus?: AnswerAction, curStatus?: AnswerAction) {
    switch (preStatus) {
      case AnswerAction.NOT_VISITED:
        this.counts.notVisited--;
        break;
      case AnswerAction.NOT_ANSWERED:
        this.counts.notAnswered--;
        break;
      case AnswerAction.MARK_FOR_REVIEW:
        this.counts.markForReview--;
        break
      case AnswerAction.ANSWERED:
        this.counts.answered--;
        break;
      case AnswerAction.SAVE_MARK_FOR_REVIEW:
        this.counts.answerReview--;
        break;
    }
    switch (curStatus) {
      case AnswerAction.NOT_VISITED:
        this.counts.notVisited++;
        break;
      case AnswerAction.NOT_ANSWERED:
        this.counts.notAnswered++;
        break;
      case AnswerAction.MARK_FOR_REVIEW:
        this.counts.markForReview++;
        break
      case AnswerAction.ANSWERED:
        this.counts.answered++;
        break;
      case AnswerAction.SAVE_MARK_FOR_REVIEW:
        this.counts.answerReview++;
        break;
    }
  }

  get getRemainingTime() {
    let hprefix, mprefix, sprefix = '';
    hprefix = ((this.timer || {}).hours) < 10 ? '0' : '';
    mprefix = ((this.timer || {}).minutes) < 10 ? '0' : '';
    sprefix = ((this.timer || {}).seconds) < 10 ? '0' : '';
    return `${hprefix + (this.timer || {}).hours}:${mprefix + (this.timer || {}).minutes}:${sprefix + (this.timer || {}).seconds}`
  }
  giveRating() {
    this.modalService.open(RatingModalComponent).result.then(res => {
      if (res) {
        this.httpService.postData(APIS.review, { ...res, object_id: this.quizService.quizId, type: ECommentType.product_review }).subscribe(res => {

        })
      }
    });
  }
}
