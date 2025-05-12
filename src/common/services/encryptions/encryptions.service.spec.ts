import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionsService } from './encryptions.service';

describe('EncryptionsService', () => {
  let service: EncryptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionsService],
    }).compile();

    service = module.get<EncryptionsService>(EncryptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt and decrypt a message', async () => {
    const message = 'Hello, World!';
    const encryptedMessage = await service.encrypt(message);
    const decryptedMessage = await service.compare(message, encryptedMessage);

    expect(decryptedMessage).toBe(true);
  });
});
