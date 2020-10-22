import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserInput } from './create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('User')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    @UsePipes(ValidationPipe)
    CreateUser(
        @Body() CreateUserInput: CreateUserInput,
    ): Promise<User>{
        return this.userService.CreateUser(CreateUserInput);
    }
}
