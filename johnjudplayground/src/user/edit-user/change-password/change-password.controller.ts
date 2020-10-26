import { Body, Controller, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { ChangePasswordInput } from './change-password.input';
import { ChangePasswordService } from './change-password.service';

@Controller('/user/edit-user/change-password')
export class ChangePasswordController {
    constructor(
        private ChangePasswordService: ChangePasswordService
    ){}

    @Patch()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    ChangePassword(
        @Body() ChangePasswordInput: ChangePasswordInput,
        @GetUser() user: User
    ): Promise<object|String>{
        return this.ChangePasswordService.changePass(ChangePasswordInput, user);
    }
}
