import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/core/users/services/users.service';
import { User } from 'src/core/users/entities/user.entity';

jest.mock('src/core/users/services/users.service');

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let mockUsersService: jest.Mocked<UsersService>;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    mockUsersService = {
        findOneByEmail: jest.fn(),
        create: jest.fn(),
    } as unknown as jest.Mocked<UsersService>;

    mockConfigService = {
      get: jest.fn().mockReturnValue('test-secret'),
    } as unknown as jest.Mocked<ConfigService>;

    jwtStrategy = new JwtStrategy(mockUsersService, mockConfigService);
  });

  describe('validate', () => {
    it('should return a user if validation is successful', async () => {
      const mockPayload = {
        email: 'test@example.com',
        id: 1,
        username: 'testuser',
      };
      const mockUser: User = { id: 1, email: 'test@example.com' } as User;

      mockUsersService.findOneByEmail = jest.fn().mockResolvedValue(mockUser);

      const result = await jwtStrategy.validate(mockPayload);

      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const mockPayload = {
        email: 'test@example.com',
        id: 1,
        username: 'testuser',
      };

      mockUsersService.findOneByEmail = jest.fn().mockResolvedValue(null);

      await expect(jwtStrategy.validate(mockPayload)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });
  });
});
