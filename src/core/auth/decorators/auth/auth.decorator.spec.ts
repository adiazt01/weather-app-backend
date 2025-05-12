import { applyDecorators, UseGuards } from '@nestjs/common';
import { Auth } from './auth.decorator';
import { AuthGuard } from '@nestjs/passport';

jest.mock('@nestjs/common', () => ({
  applyDecorators: jest.fn(),
  UseGuards: jest.fn(),
}));

jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn(),
}));

describe('auth (decorator)', () => {
  it('should call with UseGuards', () => {
    Auth();

    expect(applyDecorators).toHaveBeenCalledWith(UseGuards(AuthGuard()));
  });
});
