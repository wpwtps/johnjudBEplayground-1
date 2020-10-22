import { Injectable} from '@nestjs/common';
import Petinfo from './PetInfo.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { ObjectID, ObjectId } from 'mongodb';


@Injectable()
export class PetinfoService{
    constructor(
        @InjectRepository(Petinfo)
        private PetinfoRepository: Repository<Petinfo>
    ) {}

    async findAll(): Promise<Petinfo[]>{
        return this.PetinfoRepository.find();
    }

    async findPet(petid: ObjectId): Promise<Petinfo>{
        return this.PetinfoRepository.findOne({where:{ _id: petid }});
    }

    async findPetTest(petid: ObjectID): Promise<Petinfo>{
        return this.PetinfoRepository.findOne({where:{_id: petid}});
    }

    async findPetBookmark(petid: ObjectID): Promise<Petinfo>{
        return this.PetinfoRepository.findOne({where:{_id: petid}})
    }

    async remove(id: string): Promise<void>{
        await this.PetinfoRepository.delete(id);
    }
}

/*
async findAllPetRegister(UserId:ObjectId): Promise<Petregister[]>{
        return this.PetRegisterRepository.find({where:{UserId:UserId}});
    }
*/