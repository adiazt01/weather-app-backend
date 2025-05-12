import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { UsersService } from './services/users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ])
    ],
    providers: [EncryptionsService, UsersService],
    exports: [UsersService],    
})
export class UsersModule { }
