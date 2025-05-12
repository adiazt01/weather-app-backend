import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EncryptionsService } from './services/encryptions/encryptions.service';

@Module({
  imports: [DatabaseModule],
  providers: [EncryptionsService],
  exports: [EncryptionsService],
})
export class CommonModule {}
