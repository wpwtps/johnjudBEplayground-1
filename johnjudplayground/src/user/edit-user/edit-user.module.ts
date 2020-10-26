import { Module } from '@nestjs/common';
import { EditUserController } from './edit-user.controller';
import { EditUserService } from './edit-user.service';
import { ChangePasswordModule } from './change-password/change-password.module';

@Module({
  controllers: [EditUserController],
  providers: [EditUserService],
  imports: [ChangePasswordModule]
})
export class EditUserModule {}
