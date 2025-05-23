export interface SignupUserParams {
  email: string
  password: string
}

export interface ReturnSignupUser {
  id: string
  email: string
  password: string
}

export interface ISignupUserRepository {
  signupUser(params: SignupUserParams): Promise<ReturnSignupUser>
}
