import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class WeatherApiExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception?.name === 'WeatherApiError') {
      response.status(502).json({
        statusCode: 502,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Error communicating with Weather API',
      });
    } else {
      throw exception; // Re-throw if it's not a Weather API error
    }
  }
}