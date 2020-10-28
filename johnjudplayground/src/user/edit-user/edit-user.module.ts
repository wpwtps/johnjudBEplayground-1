import { Module } from '@nestjs/common';
import { EditUserController } from './edit-user.controller';
import { EditUserService } from './edit-user.service';
import { ChangePasswordModule } from './change-password/change-password.module';
import { ChangePhoneModule } from './change-phone/change-phone.module';
import { ChangeEmailModule } from './change-email/change-email.module';

@Module({
  controllers: [EditUserController],
  providers: [EditUserService],
  imports: [ChangePasswordModule, ChangePhoneModule, ChangeEmailModule]
})
export class EditUserModule {}
