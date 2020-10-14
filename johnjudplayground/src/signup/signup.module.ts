import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { CheckEmailModule } from './check-email/check-email.module';
import { LogininfoModule } from './logininfo/logininfo.module';
import { UserInfoModule } from './user-info/user-info.module';
import { VerifyEmailModule } from './verify-email/verify-email.module';

@Module({
  providers: [SignupService],
  controllers: [SignupController],
  imports: [CheckEmailModule, LogininfoModule, UserInfoModule, VerifyEmailModule]
})
export class SignupModule {}
