import { Module } from '@nestjs/common';
import { VerifyPhoneService } from './verify-phone.service';
import { VerifyPhoneController } from './verify-phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [VerifyPhoneService],
  controllers: [VerifyPhoneController]
})
export class VerifyPhoneModule {}
