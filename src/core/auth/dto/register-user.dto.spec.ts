import { RegisterUserDto } from './register-user.dto';
import { validate } from 'class-validator';

describe('RegisterUser (DTO)', () => {
  it('Should have all required properties', () => {
    const dto = new RegisterUserDto();

    dto.username = 'testuser';
    dto.email = 'armando@mail.com';
    dto.password = 'Craft123*';

    expect(dto).toHaveProperty('username');
    expect(dto).toHaveProperty('email');
    expect(dto).toHaveProperty('password');
  });

  it('Should validate the property with the correct password', async () => {
    const dto = new RegisterUserDto();

    dto.username = 'testuser';
    dto.email = 'armando@mail.com';
    dto.password = 'craft123';

    const errors = await validate(dto);

    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isStrongPassword');

    dto.password = 'Craft123*';
    const notErrors = await validate(dto);

    expect(notErrors.length).toBe(0);
    expect(notErrors).toEqual([]);
  });

  it('Should validate the property with the correct email', async () => {
    const dto = new RegisterUserDto();

    dto.username = 'testuser';
    dto.email = 'invalid-email';
    dto.password = 'Craft123*';

    const errors = await validate(dto);

    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isEmail');

    dto.email = 'armando@mail.com';
    const notErrors = await validate(dto);

    expect(notErrors.length).toBe(0);
    expect(notErrors).toEqual([]);
  });

  it('Should throw an error if a required property is missing', async () => {
    const dto = new RegisterUserDto();

    const errors = await validate(dto);

    expect(errors.length).toBe(3);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    expect(errors[1].constraints).toHaveProperty('isNotEmpty');
    expect(errors[2].constraints).toHaveProperty('isNotEmpty');
  });
});
