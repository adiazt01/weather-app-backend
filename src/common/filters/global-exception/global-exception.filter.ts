import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private httpExceptionFilter = new HttpExceptionFilter();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    try {
      this.httpExceptionFilter.catch(exception as HttpException, host);
    } catch (err) {
      let status = 500;
      let message: any = 'Internal server error';

      if (exception instanceof QueryFailedError) {
        status = 400;
        message = 'Database query failed';
      } else if (exception.name === 'EntityNotFound') {
        status = 404;
        message = 'Entity not found';
      }

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
      });
    }
  }
}
