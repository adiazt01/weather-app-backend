export interface JwtPayload {
  email: string;
  username: string;
  id: number;
  iat?: number;
  exp?: number;
}
