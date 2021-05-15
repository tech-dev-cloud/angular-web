export const APIS = {
  quiz: '/api/quiz',
  product: '/api/getAllProducts',
  get_product: '/api/getProduct',
  quizPlay: '/api/quiz/play/',
  login: '/login',
  logout: '/logout',
  register: '/register',
  forgot: '/forgot-password',
  reset: '/verify-reset-token',
  payment: '/api/createOrder',
  performance: '/api/performance',
  quizSubmit: '/api/submitQuiz',
  enrolled: '/api/quiz/enrolled',
  review: '/api/reviews'
}

export const USER_DETAILS = {
  Token: 'accessToken',
  Name: 'name',
  Email: 'email',
  ID: '_id'
}
export const defaultToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

export enum AuthType {
  SIGNUP,
  LOGIN,
  FORGOT
}


export const ERRORS = {
  INVALID: {
    NAME: 'Please enter a valid name',
    EMAIL: 'Please enter a valid email address',
    PHONE: 'Please enter 10 digit valid phone number'
  },
  REQUIRED: 'This field is required'
}
