import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { V2Module } from './v2/v2.module';

@Module({
  providers: [SignupService],
  controllers: [SignupController],
  imports: [V2Module]
})
export class SignupModule {}
