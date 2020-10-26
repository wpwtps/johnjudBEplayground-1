import { Module } from '@nestjs/common';
import { ChangePhoneController } from './change-phone.controller';
import { ChangePhoneService } from './change-phone.service';

@Module({
  controllers: [ChangePhoneController],
  providers: [ChangePhoneService]
})
export class ChangePhoneModule {}
