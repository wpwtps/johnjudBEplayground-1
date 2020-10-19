
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
//import { ObjectID } from 'mongodb';
import { petinfo } from './petInfo.entity';
import { petInfoService } from './petInfo.service';
import { petinfoinput } from './petinfo.input';


@Controller('petInfo')
export class petInfoController {
  constructor(private petInfoService: petInfoService) {}

  @Get('/:petid')
  getPetById(@Param('petid', ParseIntPipe) petid: string): Promise<petinfo>{
    return this.petInfoService.getPetById(petid);
  }

  /*
  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
  */

  
  @Patch()
  async updatePetStatus(
    // @Param('petid', ParseIntPipe) petid: string,
    @Body() petinfoinput: petinfoinput
  ): Promise<petinfoinput> {
    return this.petInfoService.updatePetStatus(petinfoinput);
  }
  
  @Get()
  async findAll(): Promise<petinfo[]>{
    return this.petInfoService.findAll();
  }
  
  /*
  @Patch('/:petid/PetStatus')
  updatePetStatus(
    @Param('petid', ParseIntPipe) petid: number,
    @Body('PetStatus') PetStatus: string,
  ): Promise<petinfo> {
    return this.petInfoService.updatePetStatus(petid, PetStatus);
  }
  */
}

  /*
  @Put(':id') // PUT /albums/123
  async updatePetStatus(
    @Param('id') id: ObjectID,
    @Body() createPetInfoDto: CreatePetInfoDto,
  ): Promise<petinfo> {
    const petinfo = await this.petInfoService.findOne(id);
    petinfo.PetStatus = createPetInfoDto.title;
    return await this.petInfoService.createOrUpdate(album);
  }
  */

  /*
  @Put()
  async UpdatePetStatus(){
    return "test";
  }
  */
    
