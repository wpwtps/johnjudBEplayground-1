import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
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

    @Get('/:id/getpetregcount')
    @UsePipes(ValidationPipe)
    GetPetRegCount(
        @Param('id') id: string,
    ){
        return this.userService.getPetRegCount(id);
    }

    @Get('/:id/getpetregdetail')
    @UsePipes(ValidationPipe)
    GetPetRegDetail(
        @Param('id') id: string,
    ){
        return this.userService.getPetRegDetail(id);
    }

    @Get('/:id/getpetadoptcount')
    GetPetAdoptCount(
        @Param('id') id: string,
    ){
        return this.userService.getPetAdoptCount(id);
    }

    @Get('/:id/getpetadoptdetail')
    GetPetAdoptDetail(
        @Param('id') id: string,
    ){
        return this.userService.getPetAdoptDetail(id);
    }

    @Get('/:id/getpetdonatedcount')
    GetPetDonatedCount(
        @Param('id') id: string,
    ){
        return this.userService.getPetDonatedCount(id);
    }

    @Get('/:id/getpetdonateddetail')
    GetPetDonatedDetail(
        @Param('id') id: string,
    ){
        return this.userService.getPetDonatedDetail(id);
    }
}
