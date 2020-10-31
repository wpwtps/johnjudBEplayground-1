import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { petinfo } from 'src/petInfo/petInfo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EditUserModule } from './edit-user/edit-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, petinfo]),
    AuthModule,
    EditUserModule,
  ],
  providers: [
    UserService,
    UserResolver,    
  ],
  exports:[UserService],
  controllers: [UserController]
})
export class UserModule {}
