import { Module } from '@nestjs/common';
import { CheckEmailService } from './check-email.service';
import { CheckEmailController } from './check-email.controller';

@Module({
  providers: [CheckEmailService],
  controllers: [CheckEmailController]
})
export class CheckEmailModule {}
