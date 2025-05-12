import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: +configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USERNAME') || 'root',
        password: configService.get('DB_PASSWORD') || 'root',
        database: configService.get('DB_DATABASE') || 'test',
        entities: [
          __dirname + '/../../../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
