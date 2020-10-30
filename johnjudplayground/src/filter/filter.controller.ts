import {Body, Controller ,Get, Param, Post} from '@nestjs/common';
import { filterService } from './filter.service';
import { ObjectID } from 'mongodb';
import { petinfo } from 'src/petInfo/petInfo.entity';

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

    @Get('/:Type')
    async findByType(
        @Param('Type') Type: string
    ): Promise<petinfo[]>{
        return this.filterService.findByType(Type);
    }
}
