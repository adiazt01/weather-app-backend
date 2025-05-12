import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import schemas from './schemas';
import configurations from './configurations';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    CacheModule.register({
      ttl: 300,
      max: 100,
      isGlobal: true,
      
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: schemas(),
      load: [...configurations()],
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
  ],
})
export class AppConfigModule { }