import { Body, Controller, Post } from '@nestjs/common';
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
}
