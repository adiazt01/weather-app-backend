import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AppConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { WeatherModule } from './weather/weather.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    CommonModule,
    AppConfigModule,
    CoreModule,
    WeatherModule,
    CitiesModule,
  ],
})
export class AppModule { }
