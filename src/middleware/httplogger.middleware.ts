
import { Injectable, NestMiddleware, Logger } from '@nestjs/common'; 
 
import { Request, Response, NextFunction } from 'express'; 
 
import { logger } from '../logger/winston.config'; 
 
@Injectable() 
export class AppLoggerMiddleware implements NestMiddleware { 
  private httpLogger = new Logger('HTTP'); 
 
  use(request: Request, response: Response, next: NextFunction): void { 
    const { ip, method, path: url } = request; 
    const userAgent = request.get('user-agent') || ''; 
 
    response.on('close', () => { 
      const statusCode  = response; 
      const contentLength = response.get('content-length'); 
       
 
      logger.info( 
       `${method} ${request.originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip},`
      ) 
 
      this.httpLogger.log( 
        `${method} ${request.originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip},`
      ); 
    }); 
 
    next(); 
  } 
}