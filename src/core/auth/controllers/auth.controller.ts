import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "../dto/register-user.dto";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../dto/login-user.dto";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('signup')
    @ApiOperation({
        summary: 'Register a new user',
        description: 'This endpoint allows a user to register with the system.',
    })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
    })
    signUp(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.signUp(registerUserDto);
    }

    @Post('signin')
    @ApiOperation({
        summary: 'Login a user',
        description: 'This endpoint allows a user to log in to the system.',
    })
    @ApiResponse({
        status: 200,
        description: 'User successfully logged in',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request',
    })
    signIn(@Body() loginUserDto: LoginUserDto) {
        return this.authService.signIn(loginUserDto);
    }
}