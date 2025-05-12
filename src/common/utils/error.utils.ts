export class ErrorUtils {
  static isDatabaseError(exception: any): boolean {
    // Add logic to identify database errors, e.g., based on error codes or types
    return exception?.name === 'DatabaseError';
  }

  static isWeatherApiError(exception: any): boolean {
    // Add logic to identify Weather API errors, e.g., based on custom error types or messages
    return exception?.name === 'WeatherApiError';
  }
}