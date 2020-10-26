import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EditUserModule } from './edit-user/edit-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EditUserModule
  ],
  providers: [
    UserService,
    UserResolver,    
  ],
  exports:[UserService],
  controllers: [UserController]
})
export class UserModule {}
