
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
//import { ObjectID } from 'mongodb';
import { petinfo } from './petInfo.entity';
import { petInfoService } from './petInfo.service';
import { petinfoinput } from './petinfo.input';
import {deleteinput} from './delete.input';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller('petInfo')
export class petInfoController {
  constructor(private petInfoService: petInfoService) {}

  @Get('/homepage')
  async findPetHP(): Promise<petinfo[]>{
    return this.petInfoService.findPetHP();
  }

  @Get('/:userid/homepage/receiver')
  //@UseGuards(AuthGuard())
  async findPetHPrec(
    @Param('userid') userid: string,
    @GetUser() User:User
    ): Promise<petinfo[]>{
    return this.petInfoService.findPetHPrec(userid);
  }

  @Get('/:userid/homepage/donator')
  //@UseGuards(AuthGuard())
  async findPetHPdon(
    @Param('userid') userid: string,
    @GetUser() User:User
    ): Promise<petinfo[]>{
    return this.petInfoService.findPetHPdon(userid);
  }

  @Get('/filter/height')
  //@UseGuards(AuthGuard())
  async findPetlt(
    @Param('userid') userid: string,
    @GetUser() User:User
    ): Promise<petinfo[]>{
    return this.petInfoService.findPetlt();
  }

 
  @Get('/:petid')
  getPetById(@Param('petid') petid: string): Promise<petinfo> {
    return this.petInfoService.getPetById(petid);
  }


  @Get()
  async findAll(): Promise<petinfo[]>{
    return this.petInfoService.findAll();
  }

  /*
  @Patch('/sendCodePet')
  @UseGuards(AuthGuard())
  sendCodePet(
    @Body() petinfoinput:petinfoinput,
    @GetUser() User:User
  ):Promise<petinfoinput>{
    return this.petInfoService.sendCodePet(petinfoinput,User);
  }
  */

  @Patch('/checkCode')
  @UseGuards(AuthGuard())
  checkCode(
    @Body() petinfoinput:petinfoinput,
    @GetUser() User:User
  ):Promise<petinfoinput>{
    
    return this.petInfoService.checkCode(petinfoinput, User);
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
  @Patch(':UserId/:petid/delete')
  @UseGuards(AuthGuard())
  removePet(
    @Param('petid') petid: string,
    @Param('UserId') UserId: string,
    @Body() deleteinput: deleteinput){
      deleteinput.UserId = UserId;
      deleteinput.petid = petid;  
    return this.petInfoService.removePet(deleteinput);
  }

  @Patch('/editPetInfo')
  @UseGuards(AuthGuard())
  editPetInfo(
    //@Param('petid') petid: string,
    @Body() petinfoinput: petinfoinput,
    @GetUser() User: User
  ): Promise<object> {
    return this.petInfoService.editPet(petinfoinput, User);
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

  