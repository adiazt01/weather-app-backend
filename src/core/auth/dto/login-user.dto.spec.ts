import { validate } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

describe('LoginUser (DTO)', () => {
  it('should have all required properties', () => {
    const dto = new LoginUserDto();

    dto.email = 'test@example.com';
    dto.password = 'StrongPassword123!';

    expect(dto).toHaveProperty('email');
    expect(dto).toHaveProperty('password');
    expect(dto.email).toBe('test@example.com');
    expect(dto.password).toBe('StrongPassword123!');
  });

  it('should validate the email and password properties', async () => {
    const dto = new LoginUserDto();

    dto.email = 'test@example.com';
    dto.password = 'StrongPassword123!';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(errors).toEqual([]);
    expect(errors).toHaveLength(0);
  });

  it('should throw an error if a property is invalid', async () => {
    const dto = new LoginUserDto();

    dto.email = 'invalid-email';
    dto.password = 'weakpassword';

    const errors = await validate(dto);

    expect(errors.length).toBe(2);
    expect(errors[0].constraints).toHaveProperty('isEmail');
    expect(errors[1].constraints).toHaveProperty('isStrongPassword');
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          constraints: expect.objectContaining({
            isEmail: expect.any(String),
          }),
        }),
        expect.objectContaining({
          constraints: expect.objectContaining({
            isStrongPassword: expect.any(String),
          }),
        }),
      ]),
    );
  });
});
