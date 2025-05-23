export interface AuthDemoParams {
  email: string
  password: string
}

export interface ReturnAuthDemo {
  id: string
  email: string
  password: string
}

export interface IAuthDemoRepository {
  authDemo(params: AuthDemoParams): Promise<ReturnAuthDemo>
}
