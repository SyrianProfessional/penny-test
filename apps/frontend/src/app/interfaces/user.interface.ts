export interface ISignInUser {
  email: string;
  password: string;
}

export interface ISignUpUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IResetPassword {
  token: string;
  password: string;
}
