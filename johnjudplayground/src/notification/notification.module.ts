import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'

import { notiController } from './notification.controller';
import { notiService } from './notification.service';

import {noti} from './notification.entity'

@Module({
  imports: [TypeOrmModule.forFeature([noti])],
  controllers: [notiController],
  providers: [notiService],
})
export class notiModule {}