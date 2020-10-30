import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'

import { petInfoController } from './petInfo.controller';
import { petInfoService } from './petInfo.service';

import {petinfo} from './petInfo.entity'
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([petinfo,User]),AuthModule],
  controllers: [petInfoController],
  providers: [petInfoService],
})
export class petInfoModule {}