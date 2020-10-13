import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { CheckEmailModule } from './check-email/check-email.module';
import { LogininfoModule } from './logininfo/logininfo.module';

@Module({
  providers: [SignupService],
  controllers: [SignupController],
  imports: [CheckEmailModule, LogininfoModule]
})
export class SignupModule {}
