import { Module} from '@nestjs/common';
import {PetinfoController} from './PetInfo.controller';
import {PetinfoService} from './PetInfo.service';
import Petinfo from './PetInfo.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Petinfo])],
    controllers: [PetinfoController],
    providers: [PetinfoService],
    exports: [PetinfoService]
})

export class PetinfoModule {}