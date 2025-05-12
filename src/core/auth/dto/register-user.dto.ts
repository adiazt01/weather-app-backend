import { IntersectionType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';

export class RegisterUserDto extends IntersectionType(CreateUserDto) {}
