import { Response } from "express"

export interface HttpResponse<T> {
  statusCode: HttpStatusCode
  body: T
}

export interface HttpRequest<B> {
  params?: any
  headers?: any
  body?: B
}

export enum HttpStatusCode {
  OK = 200,
  REGISTERED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export interface IController {
  handle(
    HttpRequest: HttpRequest<unknown>,
    res: Response<unknown>,
  ): Promise<HttpResponse<unknown>>
}
