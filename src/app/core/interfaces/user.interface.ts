export enum UserRole {
  TEACHER = 1,
  STUDENT = 2
}

export interface IUser {
  _id: string;
  name: string;
  // email: string;
  // role: UserRole
}