
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
//import { ObjectID } from 'mongodb';
import { petinfo } from './petInfo.entity';
import { petInfoService } from './petInfo.service';
import { petinfoinput } from './petinfo.input';


@Controller('petInfo')
export class petInfoController {
  constructor(private petInfoService: petInfoService) {}

  /*
  @Get('/:petid')
  getPetById(@Param('petid', ParseIntPipe) petid: string): Promise<petinfo>{
    return this.petInfoService.getPetById(petid);
  }
  */

  @Get('/:petid')
  getPetById(@Param('petid') petid: string): Promise<petinfo> {
    return this.petInfoService.getPetById(petid);
  }

  @Get()
  async findAll(): Promise<petinfo[]>{
    return this.petInfoService.findAll();
  }

  @Patch('/:petid')
  updatePetStatus(
    @Param('petid') petid: string,
    @Body() petinfoinput: petinfoinput
  ): Promise<petinfoinput> {
    return this.petInfoService.updatePetStatus(petinfoinput);
  }

  
}

  