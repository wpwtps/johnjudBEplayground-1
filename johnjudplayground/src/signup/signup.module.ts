import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';

@Module({
  providers: [SignupService],
  controllers: [SignupController],
  imports: []
})
export class SignupModule {}
