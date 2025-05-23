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

export interface IControllerBudgets {
  addBudget(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
  editBudget(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
  deleteBudget(
    HttpRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<unknown>>
}

export interface IControllerPots {
  addPot(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
  editPot(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
  deletePot(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
  addMoney(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
  withdrawMoney(
    HttpRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<unknown>>
}
