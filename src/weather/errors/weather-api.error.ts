export type WeatherApiErrorType = 'INVALID_REQUEST' | 'API_LIMIT_EXCEEDED' | 'SERVER_ERROR' | 'UNKNOWN_ERROR';

export class WeatherApiError extends Error {
  constructor(
    public readonly code: number,
    public readonly errorType: WeatherApiErrorType,
    message: string
  ) {
    super(message);
    this.name = 'WeatherApiError';
  }
}