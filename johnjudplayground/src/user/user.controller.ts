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

    @Get('/:UserName')
    async findUserByUsername(
        @Param('UserName') UserName: string,
    ): Promise<User>{
        return this.userService.findUserByUsername(UserName);
    }
    
    @Patch(':UserName/setting/phone')
    @UseGuards(AuthGuard())
    async UpdateUserPhone(@Param('UserName') UserName: string,
                          @Body('PhoneNO') PhoneNO: string,
                          @GetUser() User: User
                          ): Promise<User>{
        return this.userService.UpdateUserPhoneNO(UserName,PhoneNO);  
    }

    @Patch(':UserName/setting/email')
    @UseGuards(AuthGuard())
    async UpdateUserEmail(@Param('UserName') UserName: string,
                          @Body('Email') Email: string,
                          @GetUser() User: User
                          ): Promise<User>{
        return this.userService.UpdateUserEmail(UserName,Email);
    }

    @Patch(':UserName/setting/description')
    @UseGuards(AuthGuard())
    async UpdateUserDes(@Param('UserName') UserName: string,
                        @Body('Description') Description: string,
                        @GetUser() User: User
                        ): Promise<User>{
        return this.userService.UpdateUserDescription(UserName,Description);
    }

    @Patch(':UserName/setting/infosetting')
    @UseGuards(AuthGuard())
    async UpdateUserInfo(@Param('UserName') UserName: string,
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
            return this.userService.UpdateUserInfo(UserName,FirstName,LastName,Birthday,Gender,Facebook,Address);
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
}