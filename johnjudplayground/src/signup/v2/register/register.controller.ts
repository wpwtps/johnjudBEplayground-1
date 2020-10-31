import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterInput } from './register.input';
import { RegisterService } from './register.service';

@Controller('/signup/v2')
export class RegisterController {
    constructor(
        private registerService: RegisterService
    ){}

    @Post('/register')
    @UsePipes(ValidationPipe)
    CreateAccount(
        @Body() RegisterInput: RegisterInput,
    ): Promise<object>{
        return this.registerService.createAccount(RegisterInput);
    }
}
