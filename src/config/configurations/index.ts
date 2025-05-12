import appConfiguration from './app.configuration';
import authConfiguration from './auth.configuration';
import databaseConfiguration from './database.configuration';
import weatherConfiguration from './weather.configuration';

export default () => [
  appConfiguration,
  databaseConfiguration,
  authConfiguration,
  weatherConfiguration
];
