import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param ,Delete, Patch, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { CreateUserInput } from './create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';
import { petinfo } from 'src/petInfo/petInfo.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('User')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    async findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get('/:id')
    async findUserId(
        @Param('id') id: string,
    ): Promise<User>{
        return this.userService.findUserId(id);
    }
    
    @Patch(':id/setting/phone')
    @UseGuards(AuthGuard())
    async UpdateUserPhone(@Param('id') id: string,
                          @Body('PhoneNO') PhoneNO: string,
                          @GetUser() User: User
                          ): Promise<User>{
        return this.userService.UpdateUserPhoneNO(id,PhoneNO);  
    }

    @Patch(':id/setting/email')
    @UseGuards(AuthGuard())
    async UpdateUserEmail(@Param('id') id: string,
                          @Body('Email') Email: string,
                          @GetUser() User: User
                          ): Promise<User>{
        return this.userService.UpdateUserEmail(id,Email);
    }

    @Patch(':id/setting/description')
    @UseGuards(AuthGuard())
    async UpdateUserDes(@Param('id') id: string,
                        @Body('Description') Description: string,
                        @GetUser() User: User
                        ): Promise<User>{
        return this.userService.UpdateUserDescription(id,Description);
    }

    @Patch(':id/setting/infosetting')
    @UseGuards(AuthGuard())
    async UpdateUserInfo(@Param('id') id: string,
                         @Body('FirstName') FirstName: string,
                         @Body('LastName') LastName: string,
                         @Body('Birthday') Birthday: Date,
                         @Body('Gender') Gender: string,
                         @Body('Facebook') Facebook: string,
                         @Body('Address') Address: string,
                         @GetUser() User: User      
        ): Promise<User>{
        if((FirstName!='')
        && (LastName!='')
        && (Birthday!=null)
        && (Address!='')
        && (Gender!='')){
            return this.userService.UpdateUserInfo(id,FirstName,LastName,Birthday,Gender,Facebook,Address);
        }
        else{
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
        }
    }

    @Patch(':UserName/setting/uploadIMG')
    @UseGuards(AuthGuard())
    async UploadImg(
        @Body('source') source: string,
        @GetUser() user: User,
    ): Promise<object>{
        return this.userService.SaveImgURL(user, source);
    }
    /*

    @Get(':id/petregister')
    async findAllPetRegister(
        @Param('id') id: string,
        ): Promise<petinfo[]>{
        return this.userService.findAllPetRegister(id);
    }

    @Get(':id/petdonation')
    async findAllPetDonation(
        @Param('id') id: string,
        ): Promise<petinfo[]>{
        return this.userService.findAllPetDonation(id);
    }

    @Get(':id/petadoption')
    async findAllPetAdoption(
        @Param('id') id: string,
        ): Promise<petinfo[]>{
        return this.userService.findAllPetAdoption(id);
    }
    */
}