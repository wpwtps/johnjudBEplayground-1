
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

  @Get('/genpet')
  async findPetInWeb(): Promise<petinfo[]>{
    return this.petInfoService.findPetInWeb();
  }

  @Get('/:petid')
  getPetById(@Param('petid') petid: string): Promise<petinfo> {
    return this.petInfoService.getPetById(petid);
  }

    /*
  @Get('/mypetreg')
  myPetReg(
    @Body() UserId: string,
    @GetUser() User: User
  ): Promise<petinfo[]> {
    return this.petInfoService.myPetReg(UserId, User);
  }
  */

  @Get()
  async findAll(): Promise<petinfo[]>{
    return this.petInfoService.findAll();
  }


  @Patch('/updateStatus')
  @UseGuards(AuthGuard())
  updatePetStatus(
    @Param('petid') petid: string,
    @Body() petinfoinput: petinfoinput,
    @GetUser() User: User
  ): Promise<petinfoinput> {
    return this.petInfoService.updatePetStatus(petinfoinput, User);
  }
  
  //delete pet info 
  @Patch('/delete')
  @UseGuards(AuthGuard())
  removePet(
    //@Param('petid') petid: string
    @Body() petinfoinput: petinfoinput,
    @GetUser() User: User
   ): Promise<petinfoinput>  {
    return this.petInfoService.removePet(petinfoinput,User);
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

  