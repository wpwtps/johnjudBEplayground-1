import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { CheckEmailModule } from './check-email/check-email.module';

@Module({
  providers: [SignupService],
  controllers: [SignupController],
  imports: [CheckEmailModule]
})
export class SignupModule {}
