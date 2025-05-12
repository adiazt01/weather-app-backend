import { JwtPayload } from './jwt-payload.interface';

describe('JwtPayload Interface', () => {
  it('should allow valid JwtPayload objects', () => {
    const validPayload: JwtPayload = {
      email: 'test@example.com',
      username: 'test',
      id: 1,
      iat: 1633024800,
      exp: 1633028400,
    };

    expect(validPayload).toBeDefined();
    expect(validPayload.email).toBe('test@example.com');
    expect(validPayload.id).toBe(1);
    expect(validPayload.iat).toBe(1633024800);
    expect(validPayload.exp).toBe(1633028400);
  });

  it('should allow JwtPayload objects without optional fields', () => {
    const validPayload: JwtPayload = {
      email: 'test@example.com',
      username: 'test',
      id: 2,
    };

    expect(validPayload).toBeDefined();
    expect(validPayload.email).toBe('test@example.com');
    expect(validPayload.id).toBe(2);
    expect(validPayload.iat).toBeUndefined();
    expect(validPayload.exp).toBeUndefined();
  });
});
