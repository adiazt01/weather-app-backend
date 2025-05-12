import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { WeatherApiError } from '../errors/weather-api.error';

@Catch(WeatherApiError)
export class WeatherApiExceptionFilter implements ExceptionFilter {
  catch(exception: WeatherApiError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(502).json({
      statusCode: 502,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      errorCode: exception.code,
    });
  }
}