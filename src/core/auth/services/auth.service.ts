import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
    Logger,
    HttpException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { UsersService } from 'src/core/users/services/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
  
  @Injectable()
  export class AuthService {
    private readonly logger = new Logger(AuthService.name);
  
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly encryptionsService: EncryptionsService,
    ) { }
  
    async signUp(registerUserDto: RegisterUserDto) {
      try {
        const userFound = await this.usersService.findOneByEmail(
          registerUserDto.email,
        );

        if (userFound) {
          this.logger.warn(`Sign-up failed: User already exists with email ${registerUserDto.email}`);
          throw new BadRequestException('User already exists');
        }

        const newUser = await this.usersService.create(registerUserDto);

        const { password: newUserPassword, ...newUserWithoutPassword } = newUser;

        this.logger.log(`User created successfully: ${newUser.email}`);

        return {
          ...newUserWithoutPassword,
          token: this.generateJwt({
            email: newUser.email,
            id: newUser.id,
            username: newUser.username,
          }),
        };
      } catch (error) {
        if (!(error instanceof BadRequestException)) {
          this.logger.error('Error during sign-up', error.stack);
        }
        this.handleError(error);
      }
    }
  
    async signIn(loginUserDto: LoginUserDto) {
      const { email, password } = loginUserDto;
  
      try {
        const userFound = await this.usersService.findOneByEmail(email);

        if (!userFound) {
          this.logger.warn(`Sign-in failed: User not found for email ${email}`);
          throw new BadRequestException('Invalid credentials');
        }
  
        const isPasswordValid = await this.encryptionsService.compare(
          password,
          userFound.password,
        );
  
        if (!isPasswordValid) {
          this.logger.warn(`Sign-in failed: Invalid password for email ${email}`);
          throw new BadRequestException('Invalid credentials');
        }
  
        this.logger.log(`User signed in successfully: ${userFound.email}`);
  
        const { password: userFoundPassword, ...userWithoutPassword } = userFound;
  
        return {
          ...userWithoutPassword,
          token: this.generateJwt({
            email: userFound.email,
            id: userFound.id,
            username: userFound.username,
          }),
        };
      } catch (error) {
        if (!(error instanceof BadRequestException)) {
          this.logger.error('Error during sign-in', error.stack);
        }
        this.handleError(error);
      }
    }
  
    private generateJwt(payload: JwtPayload) {
      return this.jwtService.sign(payload);
    }
  
    private handleError(error: any) {
      if (
        error instanceof HttpException
      ) {
        throw error;
      }
  
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
