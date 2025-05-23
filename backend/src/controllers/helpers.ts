/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse, HttpStatusCode } from "./protocols"

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
})

export const registered = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.REGISTERED,
  body,
})

export const logged = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
})

export const badRequest = (message: string): HttpResponse<string> => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: message,
})

export const serverError = (): HttpResponse<string> => ({
  statusCode: HttpStatusCode.SERVER_ERROR,
  body: "Something went wrong",
})

export const notFound = (): HttpResponse<string> => ({
  statusCode: HttpStatusCode.NOT_FOUND,
  body: "User does not exist",
})

export const Conflict = (): HttpResponse<string> => ({
  statusCode: HttpStatusCode.CONFLICT,
  body: "User already exists with this email",
})
