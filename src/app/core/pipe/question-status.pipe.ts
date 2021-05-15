import { AnswerAction } from './../interfaces/quiz.interface';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'questionStatus'
})
export class QuestionStatusPipe implements PipeTransform {

  transform(status, ...args: any[]): any {
    switch (status) {
      case AnswerAction.NOT_VISITED:
        return { 'not-visit': true };
      case AnswerAction.NOT_ANSWERED:
        return { 'not-ans': true };
      case AnswerAction.ANSWERED:
        return { 'ans': true };
      case AnswerAction.MARK_FOR_REVIEW:
        return { 'review': true };
      case AnswerAction.SAVE_MARK_FOR_REVIEW:
        return { 'ans-mark': true };
    }
    return null;
  }

}
