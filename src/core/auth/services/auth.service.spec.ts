import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { UsersService } from 'src/core/users/services/users.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { User } from 'src/core/users/entities/user.entity';
import { Logger } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let encryptionsService: EncryptionsService;

  beforeAll(() => {
    Logger.overrideLogger(false);
  });

  beforeEach(async () => {
    const mockUsersService = {
      create: jest.fn(),
      findOneByEmail: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const mockEncryptionsService = {
      compare: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: EncryptionsService,
          useValue: mockEncryptionsService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    encryptionsService = module.get<EncryptionsService>(EncryptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if email already exists during signUp', async () => {
    const dto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
    };

    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue({
      createdAt: new Date(),
      email: dto.email,
      id: 1,
      password: 'hashed-password-placeholder',
      updatedAt: new Date(),
      username: dto.username,
      cityFavorites: [],
    });
    jest.spyOn(usersService, 'create')

    await expect(service.signUp(dto)).rejects.toThrow('User already exists');

    expect(usersService.findOneByEmail).toHaveBeenCalledWith(dto.email);
    expect(usersService.create).not.toHaveBeenCalled( );
  });

  it('should throw an error if invalid credentials are provided during signIn', async () => {
    const dto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
      username: 'testuser',
    };

    const userFound: User = {
      id: 1,
      ...dto,
      password: 'hashed-password-placeholder',
      createdAt: new Date(),
      updatedAt: new Date(),
      cityFavorites: [],
      email: dto.email,
      username: dto.username,
    };

    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(userFound);
    jest.spyOn(encryptionsService, 'compare').mockResolvedValue(false);

    await expect(service.signIn(dto)).rejects.toThrow('Invalid credentials');
    expect(usersService.findOneByEmail).toHaveBeenCalledWith(dto.email);
    expect(encryptionsService.compare).toHaveBeenCalledWith(
      dto.password,
      userFound.password,
    );
    expect(jwtService.sign).not.toHaveBeenCalled();
  });

  it('should throw an error if user is not found during signIn', async () => {
    const dto: RegisterUserDto = {
      email: 'nonexistent@example.com',
      password: 'password123',
      username: 'testuser',
    };

    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

    await expect(service.signIn(dto)).rejects.toThrow('Invalid credentials');
    expect(usersService.findOneByEmail).toHaveBeenCalledWith(dto.email);
    expect(encryptionsService.compare).not.toHaveBeenCalled();
    expect(jwtService.sign).not.toHaveBeenCalled();
  });

  it('should generate a JWT token with the correct payload', async () => {
    const dto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
    };

    const createdUser = {
      id: 1,
      email: dto.email,
      username: dto.username,
      password: 'hashed-password-placeholder',
      createdAt: new Date(),
      updatedAt: new Date(),
      cityFavorites: [],
    };

    jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);
    jest.spyOn(jwtService, 'sign').mockReturnValue('mocked-jwt-token');

    const result = await service.signUp(dto);

    const { password, ...expectedUser } = createdUser;

    expect(result).toEqual({
      ...expectedUser,
      token: 'mocked-jwt-token',
    });
  });

  it('should generate a JWT token with the correct payload for signIn', async () => {
    const dto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
    };

    const userFound: User = {
      id: 1,
      ...dto,
      password: 'hashed-password-placeholder',
      createdAt: new Date(),
      updatedAt: new Date(),
      cityFavorites: [],
      email: dto.email,
      username: dto.username,
    };

    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(userFound);
    jest.spyOn(encryptionsService, 'compare').mockResolvedValue(true);
    jest.spyOn(jwtService, 'sign').mockReturnValue('mocked-jwt-token');

    const result = await service.signIn(dto);

    expect(usersService.findOneByEmail).toHaveBeenCalledWith(dto.email);
    expect(encryptionsService.compare).toHaveBeenCalledWith(
      dto.password,
      userFound.password,
    );
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: userFound.id,
      email: userFound.email,
      username: userFound.username,
    });

    const { password, ...expectedUser } = userFound;
    expect(result).toEqual({
      ...expectedUser,
      token: 'mocked-jwt-token',
    });
  });
});
