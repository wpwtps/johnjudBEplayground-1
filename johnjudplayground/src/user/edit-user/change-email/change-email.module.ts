import { Module } from '@nestjs/common';
import { ChangeEmailService } from './change-email.service';
import { ChangeEmailController } from './change-email.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
  ],
  providers: [ChangeEmailService],
  controllers: [ChangeEmailController]
})
export class ChangeEmailModule {}
