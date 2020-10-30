import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'

import { notiController } from './notification.controller';
import { notiService } from './notification.service';

import {noti} from './notification.entity'
import { User } from 'src/user/user.entity';
import { petinfo } from 'src/petInfo/petInfo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([noti,User,petinfo]),AuthModule],
  controllers: [notiController],
  providers: [notiService],
})
export class notiModule {}