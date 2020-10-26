import { Controller, Get, Param } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { noti } from './notification.entity';
import { notiService } from './notification.service';

@Controller('noti')
export class notiController {
  constructor(private notiService: notiService) {}

  /*
  @Get('/:UserID')
  getNotiById(@Param('UserID') UserID: string): Promise<noti> {
    return this.notiService.getNotiById(UserID);
  }
  */

  @Get('/:_id')
  getNotiById(@Param('_id') _id: string): Promise<noti> {
    return this.notiService.getNotiById(_id);
  }
  
  @Get()
  async findAll(): Promise<noti[]>{
    return this.notiService.findAll();
  }

}
