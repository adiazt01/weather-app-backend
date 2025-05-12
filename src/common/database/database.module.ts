import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST') || 'localhost',
                    port: +configService.get('DB_PORT') || 5432,
                    username: configService.get('DB_USERNAME') || 'root',
                    password: configService.get('DB_PASSWORD') || 'root',
                    database: configService.get('DB_DATABASE') || 'test',
                    autoLoadEntities: true,
                    synchronize: true,
                    logging: true,
                };
            },
        }),
    ],
    providers: [],
    exports: [TypeOrmModule],
})
export class DatabaseModule {
}
