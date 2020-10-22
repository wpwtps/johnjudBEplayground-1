import {Body, Controller ,Get, Param, Post} from '@nestjs/common';
import { HomePageService} from './Homepage.service';
import { ObjectID } from 'mongodb';
import { CreatePetDto } from 'src/dto/create-petinfo.dto';
import Petinfo from 'src/Pets_profile/PetInfo.entity';
import { ParseObjectIdPipe } from 'src/common/pipe';

@Controller('homepage')
export class HomePageController{
    constructor(private HomePageService: HomePageService){}

    @Get(':UserId')
    async findAllPetRegister(@Param('UserId') UserId: ObjectID): Promise<Petinfo[]>{
        return this.HomePageService.findAllPetRegister(UserId);
    }

    @Get('filter/typedog')
    async findPetTypedog(): Promise<Petinfo[]>{
        return this.HomePageService.findPetTypedog();
    }

    @Get('filter/typecat')
    async findPetTypecat(): Promise<Petinfo[]>{
        return this.HomePageService.findPetTypecat();
    }

    @Get('filter/other')
    async findPetOther(): Promise<Petinfo[]>{
        return this.HomePageService.findPetOther();
    }   
}