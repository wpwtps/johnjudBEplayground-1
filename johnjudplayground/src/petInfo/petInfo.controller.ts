
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
//import { ObjectID } from 'mongodb';
import { petinfo } from './petInfo.entity';
import { petInfoService } from './petInfo.service';
import { petinfoinput } from './petinfo.input';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller('petInfo')
export class petInfoController {
  constructor(private petInfoService: petInfoService) {}

  @Get('/:petid/findpet')
  getPetById(@Param('petid') petid: string): Promise<petinfo> {
    return this.petInfoService.getPetById(petid);
  }

  @Get()
  async findAll(): Promise<petinfo[]>{
    return this.petInfoService.findAll();
  }

  @Get('/genpet')
  async findPetInWeb(): Promise<petinfo[]>{
    return this.petInfoService.findPetInWeb();
  }

  @Patch('/:petid/updateStatus')
  updatePetStatus(
    @Param('petid') petid: string,
    @Body() petinfoinput: petinfoinput
  ): Promise<petinfoinput> {
    return this.petInfoService.updatePetStatus(petinfoinput);
  }
  
  //delete pet info 
  @Patch('/:petid/delete')
  removePet(
    //@Param('petid') petid: string
    @Body() petinfoinput: petinfoinput
   ): Promise<petinfoinput>  {
    return this.petInfoService.removePet(petinfoinput);
  }

  @Post()
  @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    CreatePetInfo(
        @Body() petinfoinput:petinfoinput,
        @GetUser() User: User
    ): Promise<object>{
        return this.petInfoService.createPetInfo(petinfoinput, User);
    }
  
}

  