import * as Joi from 'joi';
import appConfigurationSchema from './app-configuration.schema';
import databaseConfigurationSchema from './database-configuration.schema';
import authConfigurationSchema from './auth-configuration.schema';
import weatherConfigurationSchema from './weather-configuration.schema';

const schemas = Joi.object()
  .concat(appConfigurationSchema())
  .concat(databaseConfigurationSchema())
  .concat(authConfigurationSchema())
  .concat(weatherConfigurationSchema())
  .unknown(true);

export default () => schemas;
