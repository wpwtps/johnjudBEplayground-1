import { Body, Controller, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { ChangeEmailInput } from './change-email.input';
import { ChangeEmailService } from './change-email.service';

@Controller('/user/edit-user/change-email')
export class ChangeEmailController {
    constructor(
        private ChangeEmailService: ChangeEmailService,
    ){}

    @Patch()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    ChangeEmail(
        @Body() ChangeEmailInput: ChangeEmailInput,
        @GetUser() user: User,
    ): Promise<object>{
        return this.ChangeEmailService.changeEmail(ChangeEmailInput, user);
    }
}
