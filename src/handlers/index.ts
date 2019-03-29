import { Handler } from 'express';
import { HttpFunctionHandler } from './types';

import logger from '../logger';

import helloHandler from './HelloHandler'

const httpFunctionDecorator = (functionHandler: HttpFunctionHandler) : Handler => {
  return async (req, res) => {
      logger.info(req.headers);
      const requestId = req.headers['requestId'];
      logger.setMetadata('apiRequestId', requestId || ''); 

      const resultEither = await functionHandler(req);

      resultEither.fold(
        (applicationError) => {
          logger.error(applicationError, {...applicationError.context, httpStatus: applicationError.httpStatus, errorDescription: applicationError.description});          
          res.status(applicationError.httpStatus).json({});   
      }, 
        (result) => {
          res.json(result);
      });
  }    
}

export const createHandlers = () => {
  
  return {
    helloHandler : httpFunctionDecorator(helloHandler)
  }
}
