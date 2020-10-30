import { Injectable} from '@nestjs/common';
import {Not, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ObjectID, ObjectId} from 'mongodb';

import { petinfo } from 'src/petInfo/petInfo.entity';


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

    async findByType(Type:string): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{Type:Type}});
    }
}