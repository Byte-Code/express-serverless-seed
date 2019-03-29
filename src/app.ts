import express from 'express';
import cors from 'cors';
import compression from 'compression';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import { createHandlers } from './handlers';

export const createApplication = () => {
    const { 
        helloHandler
    } = createHandlers();
    
    const app = express();
    app.set('etag', false);

    const router = express.Router();
    
    router.use(compression({threshold:0}));
    
    router.use(cors());
    router.use(awsServerlessExpressMiddleware.eventContext());
    
    router.get('/hello', helloHandler); 
    
    app.use('/', router);

    return app;
}
