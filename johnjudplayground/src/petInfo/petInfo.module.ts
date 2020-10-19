import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'

import { petInfoController } from './petInfo.controller';
import { petInfoService } from './petInfo.service';

import {petinfo} from './petInfo.entity'

@Module({
  imports: [TypeOrmModule.forFeature([petinfo])],
  controllers: [petInfoController],
  providers: [petInfoService],
})
export class petInfoModule {}