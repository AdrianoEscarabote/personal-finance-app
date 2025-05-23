export interface UserAuthenticatedParams {
  id: string
  token: string
}

export interface UserAuthenticatedReturn {
  msg: string
}

export interface IUserAuthenticatedRepository {
  authenticateUser(
    params: UserAuthenticatedParams,
  ): Promise<UserAuthenticatedReturn>
}
