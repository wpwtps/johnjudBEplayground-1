import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LogininfoModule } from 'src/signup/v1/logininfo/logininfo.module';
import { User } from 'src/user/user.entity';
import { ChangePasswordController } from './change-password.controller';
import { ChangePasswordService } from './change-password.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [ChangePasswordController],
  providers: [ChangePasswordService]
})
export class ChangePasswordModule {}
