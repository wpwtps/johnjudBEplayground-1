import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { CheckEmailModule } from './v1/check-email/check-email.module';
import { LogininfoModule } from './v1/logininfo/logininfo.module';
import { UserInfoModule } from './v1/user-info/user-info.module';
import { VerifyEmailModule } from './v1/verify-email/verify-email.module';
import { VerifyPhoneModule } from './v1/verify-phone/verify-phone.module';
import { V1Module } from './v1/v1.module';

@Module({
  providers: [SignupService],
  controllers: [SignupController],
  imports: [CheckEmailModule, LogininfoModule, UserInfoModule, VerifyEmailModule, VerifyPhoneModule, V1Module]
})
export class SignupModule {}
