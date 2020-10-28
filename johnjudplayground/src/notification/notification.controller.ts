import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { noti } from './notification.entity';
import { notiService } from './notification.service';
import {notiinput} from './notification.input';
import { User } from 'src/user/user.entity';

import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { petinfo } from 'src/petInfo/petInfo.entity';

@Controller('noti')
export class notiController {
  constructor(private notiService: notiService) {}

  /*
  @Get('/:UserID')
  getNotiById(@Param('UserID') UserID: string): Promise<noti> {
    return this.notiService.getNotiById(UserID);
  }
  */

  @Get('/:notiid')
  getNotiById(@Param('notiid') notiid: string): Promise<noti> {
    return this.notiService.getNotiById(notiid);
  }
  
  @Get()
  async findAll(): Promise<noti[]>{
    return this.notiService.findAll();
  }
  
  @Post()
  @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    CreateNoti(
        @Body() notiinput:notiinput,
        @GetUser() User: User
    ): Promise<object>{
        return this.notiService.createNoti(notiinput, User);
    }
  
    
  @Patch('/:notiid/accept')
  @UseGuards(AuthGuard())
  acceptNoti(
    @Param('notiid') notiid: string,
    @Body() notiinput:notiinput,
    @GetUser() User:User
  ): Promise<noti>{
    return this.notiService.acceptNoti(notiinput,User);
  }



}
