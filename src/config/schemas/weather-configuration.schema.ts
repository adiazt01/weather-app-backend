import * as Joi from 'joi';

export default () =>
  Joi.object({
    WEATHER_API_KEY: Joi.string().required(),
    WEATHER_API_URL: Joi.string().uri().required(),
  });
