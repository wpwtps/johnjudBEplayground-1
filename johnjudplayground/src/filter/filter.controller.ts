import {Body, Controller ,Get, Param, Post} from '@nestjs/common';
import { filterService } from './filter.service';
import { ObjectID } from 'mongodb';
import { petinfo } from 'src/petInfo/petInfo.entity';
import { Filterinput } from './filter.input';
import { MinLength } from 'class-validator';

@Controller('filter')
export class filterController{
    constructor(private filterService: filterService){}

    @Get('typedog')
    async findPetTypedog(): Promise<petinfo[]>{
        return this.filterService.findPetTypedog();
    }

    @Get('typecat')
    async findPetTypecat(): Promise<petinfo[]>{
        return this.filterService.findPetTypecat();
    }

    @Get('other')
    async findPetOther(): Promise<petinfo[]>{
        return this.filterService.findPetOther();
    }

    @Get('/others/Type')
    async findByType(
        @Body('type') type:Filterinput
    ): Promise<petinfo[]>{
        return this.filterService.findByType(type);
    }

    @Get('/Height')
    async findByHeight(
        @Body('MinHeight') MinHeigth:Filterinput,
        @Body('MaxHeight') MaxHeigth:Filterinput
    ): Promise<petinfo[]>{
        return this.filterService.findByHeight(MinHeigth,MaxHeigth);
    }
    

}
