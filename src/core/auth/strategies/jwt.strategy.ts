import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/core/users/services/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from 'src/core/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET')!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid token');

    return user;
  }
}
