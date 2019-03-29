import { Either } from 'funfix-core';
import { Request } from 'express';

export interface ApplicationError {
  readonly httpStatus: number,  
  readonly description: string,
  readonly context: any
}

export class NotFoundError implements ApplicationError {
  readonly httpStatus: number;  
  readonly description: string;
  readonly context: any;

  constructor (context: any) {
    this.httpStatus = 404;
    this.description = 'Not found'
    this.context = context;
  } 
}

export class InternalServerError implements ApplicationError {  
  readonly httpStatus: number;  
  readonly description: string;
  readonly context: any;

  constructor (context: any) {
    this.httpStatus = 500;
    this.description = 'Internal error'
    this.context = context;
  } 
}

export class UnexpectedError implements ApplicationError {  
  readonly httpStatus: number;  
  readonly description: string;
  readonly context: any;

  constructor (context: any) {
    this.httpStatus = 500;
    this.description = 'Unexpected error'
    this.context = context;
  } 
}

export const createContextFromRequest = (request: Request) => {
  return {
    'x-amzn-requestid': request.headers['x-amzn-requestid'],
    'x-amz-apigw-id': request.headers['x-amz-apigw-id'], 
    'x-amzn-trace-id': request.headers['x-amzn-trace-id']
  }
}

export type HttpFunctionHandler = (req: Request) => Promise<Either<ApplicationError, Object>> ;
