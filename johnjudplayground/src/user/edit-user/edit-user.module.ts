import { Module } from '@nestjs/common';
import { EditUserController } from './edit-user.controller';
import { EditUserService } from './edit-user.service';

@Module({
  controllers: [EditUserController],
  providers: [EditUserService]
})
export class EditUserModule {}
