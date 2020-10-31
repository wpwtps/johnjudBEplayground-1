import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'

import { petInfoController } from './petInfo.controller';
import { petInfoService } from './petInfo.service';

import {petinfo} from './petInfo.entity'
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/user.entity';
import { noti } from 'src/notification/notification.entity'
import { notiModule } from 'src/notification/notification.module';
import { notiService } from 'src/notification/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([petinfo,User,noti]),AuthModule],
  controllers: [petInfoController],
  providers: [petInfoService,notiService],
})
export class petInfoModule {}