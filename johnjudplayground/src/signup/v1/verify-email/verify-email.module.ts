import { Module } from '@nestjs/common';
import { VerifyEmailService } from './verify-email.service';
import { VerifyEmailController } from './verify-email.controller';

@Module({
  providers: [VerifyEmailService],
  controllers: [VerifyEmailController]
})
export class VerifyEmailModule {}
