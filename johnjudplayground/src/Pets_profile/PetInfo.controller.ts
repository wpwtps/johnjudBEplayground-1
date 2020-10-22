import {Controller ,Delete,Get, Param} from '@nestjs/common';
import { PetinfoService} from './PetInfo.service';
import {Petinfo} from './PetInfo.entity';
import {ObjectId, ObjectID} from 'mongodb'
import { PetinfoModule } from './PetInfo.module';
import { ParseObjectIdPipe } from 'src/common/pipe';

@Controller('petinfo')
export class PetinfoController{
    constructor(private PetinfoService: PetinfoService){}

    @Get()
    async findAll(): Promise<Petinfo[]>{
        return this.PetinfoService.findAll();
    }

    @Get(':petid')
    async findPet(@Param('petid',ParseObjectIdPipe) petid: ObjectId): Promise<Petinfo>{
        return this.PetinfoService.findPet(petid);
    }

    @Delete(':petid/delete')
    deletePet(@Param('petid') petid: string): Promise<void>{
        return this.PetinfoService.remove(petid);
    }
}