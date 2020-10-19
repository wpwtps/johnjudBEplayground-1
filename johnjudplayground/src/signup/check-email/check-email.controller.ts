import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { CheckEmailService } from './check-email.service';
import { CreateEmailUserInput } from './create-email-user.input';

@Controller('/signup/check-email')
export class CheckEmailController {
    constructor(
        private checkEmailService: CheckEmailService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    CreateEmailUser(
        @Body() CreateEmailUserInput: CreateEmailUserInput,
    ): Promise<User>{
        return this.checkEmailService.CreateEmailUser(CreateEmailUserInput);
    }
}
