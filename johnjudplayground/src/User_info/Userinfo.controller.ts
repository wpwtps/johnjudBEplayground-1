import {Body, Controller ,Delete,Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {ObjectId, ObjectID} from 'mongodb'
import Userinfo from './Userinfo.entity';
import { UserinfoService } from './Userinfo.service';
import { CreatePetDto } from '../dto/create-petinfo.dto';
import {ParseObjectIdPipe} from '../common/pipe';
import Petinfo from 'src/Pets_profile/PetInfo.entity';

@Controller('userinfo')
export class UserinfoController{
    constructor(private UserinfoService: UserinfoService ){}

    @Get() //เอาไว้ test
    async findAll(): Promise<Userinfo[]>{
        return this.UserinfoService.findAll();
    }
    
    @Get(':UserId/petregister')
    async findAllPetRegister(@Param('UserId') UserId: ObjectID): Promise<Petinfo[]>{
        return this.UserinfoService.findAllPetRegister(UserId);
    }

    @Get(':UserId/petdonation')
    async findAllPetDonation(@Param('UserId') UserId: ObjectID): Promise<Petinfo[]>{
        return this.UserinfoService.findAllPetDonation(UserId);
    }

    @Get(':UserId/petadoption')
    async findAllPetAdoption(@Param('UserId') UserId: ObjectID): Promise<Petinfo[]>{
        return this.UserinfoService.findAllPetAdoption(UserId);
    }

    @Get('/:UserId')
    async findUserId(@Param('UserId',ParseObjectIdPipe) UserId: ObjectID): Promise<Userinfo>{
        return this.UserinfoService.findUserId(UserId);
    }

    @Delete(':UserId/setting/delete')
    deleteUserId(@Param('UserId') UserId: string): Promise<void>{
        return this.UserinfoService.deleteUserId(UserId);
    }

    @Patch(':UserId/setting/phone')
    async UpdateUserPhone(@Param('UserId',ParseObjectIdPipe) UserId: ObjectID,
                          @Body('PhoneNO') PhoneNO: string): Promise<Userinfo>{
        return this.UserinfoService.UpdateUserPhoneNO(UserId,PhoneNO);
    }

    @Patch(':UserId/setting/email')
    async UpdateUserEmail(@Param('UserId',ParseObjectIdPipe) UserId: ObjectID,
                          @Body('Email') Email: string): Promise<Userinfo>{
        return this.UserinfoService.UpdateUserEmail(UserId,Email);
    }

    @Patch(':UserId/setting/infosetting')
    async UpdateUserInfo(@Param('UserId',ParseObjectIdPipe) UserId: ObjectID,
                         @Body('FirstName') FirstName: string,
                         @Body('LastName') LastName: string,
                         @Body('Birthday') Birthday: string,
                         @Body('Gender') Gender: string,
                         @Body('Address') Address: string,
                         @Body('Facebook') Facebook: string             
    ): Promise<Userinfo>{
        if((FirstName!='')
        && (LastName!='') 
        && (Gender!='') 
        && (Address!='')
        && (Birthday!='')){
            return this.UserinfoService.UpdateUserInfo(UserId,FirstName,LastName,Birthday,Gender,Address,Facebook);
        }
        else{
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
        }
    }

    @Patch(':UserId/setting/description')
    async UpdateUserDes(@Param('UserId',ParseObjectIdPipe) UserId: ObjectID,
                        @Body('Description') Description: string): Promise<Userinfo>{
        return this.UserinfoService.UpdateUserDescription(UserId,Description);
    }

    @Post(':UserId/createpet')
    async createPet(@Param('UserId') UserId: ObjectID,
                    @Body() CreatePetDto: CreatePetDto){
        CreatePetDto.UserId = UserId;
        CreatePetDto.AdopUserId = "";
        CreatePetDto.regPetStatus = "register";
        CreatePetDto.adopPetStatus = "";
        CreatePetDto.PetStatus = "available";

        return this.UserinfoService.createPet(CreatePetDto)
    }    
}