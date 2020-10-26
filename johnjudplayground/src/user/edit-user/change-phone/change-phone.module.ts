import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/user.entity';
import { ChangePhoneController } from './change-phone.controller';
import { ChangePhoneService } from './change-phone.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [ChangePhoneController],
  providers: [ChangePhoneService]
})
export class ChangePhoneModule {}
