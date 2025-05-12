import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionsService {
  private readonly saltRounds = 10;

  async encrypt(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(data, salt);
  }

  async compare(data: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(data, hashed);
  }
}
