import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserInfoService],
  controllers: [UserInfoController]
})
export class UserInfoModule {}
