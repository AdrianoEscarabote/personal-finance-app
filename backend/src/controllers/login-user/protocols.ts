export interface LoginUserParams {
  email: string
  password: string
}

export interface LoginUserReturnTypes {
  id: string
  success: boolean
}

export interface ILoginUserRepository {
  loginUser(params: LoginUserParams): Promise<LoginUserReturnTypes>
}
