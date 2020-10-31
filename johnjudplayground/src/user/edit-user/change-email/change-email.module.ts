import { Module } from '@nestjs/common';
import { ChangeEmailService } from './change-email.service';
import { ChangeEmailController } from './change-email.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  providers: [ChangeEmailService],
  controllers: [ChangeEmailController]
})
export class ChangeEmailModule {}
