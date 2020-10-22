import { Body, Controller, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { LoginInfoService } from './logininfo.service';
import { UpdateLoginInfoInput } from './update-logininfo.input';

@Controller('/signup/logininfo')
export class LogininfoController {
    constructor(
        private loginInfoService: LoginInfoService
    ){}

    @Patch()
    @UsePipes(ValidationPipe)
    LoginInfo(
        @Body() UpdateLoginInfoInput: UpdateLoginInfoInput, ConfirmPassword: string,
    ): Promise<object|String>{
        return this.loginInfoService.updateUserLoginInfo(UpdateLoginInfoInput,);
    }
}
