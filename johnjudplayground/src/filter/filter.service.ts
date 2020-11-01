import { Injectable} from '@nestjs/common';
import {Not, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ObjectID, ObjectId} from 'mongodb';
import {LessThan} from "typeorm";
import {MoreThan} from "typeorm";
import { petinfo } from 'src/petInfo/petInfo.entity';
import {Equal} from "typeorm";

import { Filterinput } from './filter.input';


@Injectable()
export class filterService{
    constructor(
        @InjectRepository(petinfo)
        private petInfoRepository: Repository<petinfo>
    ) {}

    async findPetTypedog(): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{Type:"dog"}})
    }

    async findPetTypecat(): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{Type:"cat"}})
    }

    async findPetOther(): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{Type:"others"}})
    }

    async findByType(type:Filterinput): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{Type:type}});
    }

    async findByHeight(Height:Filterinput): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{PetHeight:Height}});
    }

}