import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { AuthInput } from './auth.input';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';

@Controller('/signin')
export class AuthController {
    constructor(
        private AuthService: AuthService
    ){}

    @Post()
    SignIn(
        @Body() AuthInput: AuthInput,
    ){
        return this.AuthService.SignIn(AuthInput);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        
    }

    @Get('/get-basic')
    @UseGuards(AuthGuard())
    GetBasic(
        @GetUser() user: User,
    ){
        const res = this.AuthService.getBasicInfo(user);
        // 
        return res;
        
    }
}
