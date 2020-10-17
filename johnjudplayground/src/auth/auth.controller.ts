import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthInput } from './auth.input';
import { AuthService } from './auth.service';

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
        console.log(req.user);
    }
}
