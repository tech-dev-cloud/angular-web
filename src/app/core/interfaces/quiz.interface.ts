import { IUser } from './user.interface';

export interface ISubject {
  _id: string;
  name: string
}
export enum ILevel {
  BIGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert'
}

export enum ProductType {
  QUIZ = 'quiz',
  COURSE = 'course',
  NOTES = 'notes',
  BULK = 'bulk'
}

export enum AnswerAction {
  NOT_VISITED,
  NOT_ANSWERED,
  ANSWERED,
  MARK_FOR_REVIEW,
  SAVE_MARK_FOR_REVIEW
}
export enum ANSWER_STATUS {
  NOT_ANSWERED,
  WRONG_ANSWERED,
  CORRECT_ANSWERED
}



export interface IQuestion {
  _id: string;
  options: string[];
  status: boolean;
  attemptStatus: AnswerAction;
  question: string;
  description: string;
  answer?: string[]
}

export enum Result {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  NOT_ATTEMPT = "not_attempt"
}

export interface IAnswer {
  question_id: string;
  answer?: string[];
  status: AnswerAction;
  resultStatus?: Result;
}

export interface ITimer {
  hours: number;
  minutes: number;
  seconds: number;
}

export enum QuizStatus {
  ON_HOLD = 'on_hold',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

export interface IOngoingQuiz {
  remainingTime?: ITimer;
  status: QuizStatus;
  userAnswers?: IAnswer[];
}

export interface IQuiz {
  _id: string;
  title: string;
  subjectData: ISubject;
  status: string;
  instructor: IUser;
  isPaid: boolean;
  amount: number;
  imageURL: string;
  headline?: string;
  productType: ProductType;
  instructionalLevel: ILevel;
  totalQuestions: number;
  benefits: string[];
  // description:string;
  // objectivesSummary: string[];
  // requirements: string[];
  attemptTime: number;
  // questions?: IQuestion[];

}