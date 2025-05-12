import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
