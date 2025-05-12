import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dto/login-user.dto';

describe('AuthController', () => {
    let authController: AuthController;

    beforeEach(async () => {
        const mockAuthService = {
            signUp: jest.fn(),
            signIn: jest.fn(),
        };

        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
            ],
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    it('should call the signUp method with the Correct Dto parameter', () => {
        const signUpDto: RegisterUserDto = {
            email: 'test@example.com',
            password: 'StrongPassword123*',
            username: 'testuser',
        }

        const signUpSpy = jest.spyOn(authController, 'signUp');

        authController.signUp(signUpDto);

        expect(signUpSpy).toHaveBeenCalledWith(signUpDto);
    });

    it('should call the signIn method with the Correct Dto parameter', () => {
        const signInDto: LoginUserDto = {
            email: 'test@example.com',
            password: 'StrongPassword123*',
        }

        const signInSpy = jest.spyOn(authController, 'signIn');

        authController.signIn(signInDto);

        expect(signInSpy).toHaveBeenCalledWith(signInDto);
    });
});
