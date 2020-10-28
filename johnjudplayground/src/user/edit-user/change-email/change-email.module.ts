import { Module } from '@nestjs/common';
import { ChangeEmailService } from './change-email.service';
import { ChangeEmailController } from './change-email.controller';

@Module({
  providers: [ChangeEmailService],
  controllers: [ChangeEmailController]
})
export class ChangeEmailModule {}
