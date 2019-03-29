import { HttpFunctionHandler, UnexpectedError, createContextFromRequest } from "./types";
import { Either } from "funfix-core";
import { Request } from "express";
import { safeQueryStringParam } from "./helpers";

import logger from '../logger';

const handler : HttpFunctionHandler = async (req: Request) => {    
  const shouldFail = safeQueryStringParam(req, 'shouldFail', '');

  try {  
    if (shouldFail) {
      logger.info('Should fail activated',{},['interesting']);
      throw new Error('You shall not pass!')
    }

    return Either.right({success:true});
  } catch (err) {
    return Either.left(new UnexpectedError({... createContextFromRequest(req)}));
  }
};

export default handler;
