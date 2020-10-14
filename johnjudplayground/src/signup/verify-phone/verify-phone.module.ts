import { Module } from '@nestjs/common';
import { VerifyPhoneService } from './verify-phone.service';
import { VerifyPhoneController } from './verify-phone.controller';

@Module({
  providers: [VerifyPhoneService],
  controllers: [VerifyPhoneController]
})
export class VerifyPhoneModule {}
