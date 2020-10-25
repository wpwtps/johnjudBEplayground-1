import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectID, Repository, Not, IsNull, ObjectType} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {petinfo} from './petInfo.entity';
import {User} from 'src/user/user.entity';

import { petinfoinput } from './petinfo.input';
import { v4 as uuid } from 'uuid';
//import { noti } from 'src/notification/notification.entity';

@Injectable()
export class petInfoService {

  constructor(
    @InjectRepository(petinfo)
    private petInfoRepository: Repository<petinfo>
    ){}

  //all pet, PetStatus = [ava, pend, done]
  async findAll(): Promise<petinfo[]> {
    const res = await this.petInfoRepository.find();
    //console.log(res);
    
    return res;
  }

  //find only pet show in webApp, del pet not in this case
  async findPetInWeb(): Promise<petinfo[]> {
    //console.log('findPetWeb');
    //const res = await this.petInfoRepository.find({where:{ PetStatus: Not("delete") }});
    const res = await this.petInfoRepository.find({
        where:{$or:[{PetStatus: 'ava'},{PetStatus:'pend'},{PetStatus:'done'}]}
        //where:{$not:{PetStatus: null}}
          
      });
    console.log(res);
    
    return res;
  }

  async getPetById(petid: string): Promise<petinfo> {
    const found = await this.petInfoRepository.findOne({where:{ petid }});
    //const found = await this.petInfoRepository.findByIds();
    if (!found) {
      throw new NotFoundException(`Task with ID ${petid} not found`);
    }
    //test
    return found;
  }

  async createPetInfo(petinfoinput:petinfoinput): Promise<object>{
    const { petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId} = petinfoinput;
    const newPet = this.petInfoRepository.create({
      petid: uuid(),
    });

    const TimeUpdate = new Date();

    newPet.PetName = PetName;
    newPet.PetBreed = PetBreed;
    newPet.PetGender = PetGender;
    newPet.Type = Type;
    newPet.PetPicURL = PetPicURL;
    newPet.PetStatus = 'ava'
    newPet.PetLength = PetLength;
    newPet.PetHeight = PetHeight;
    newPet.PetCerURL = PetCerURL;
    newPet.TimeStampUpdate = TimeUpdate;

    //edit after as User Entity
    newPet.UserId = UserId;

    newPet.AdopUserId = '';
    await this.petInfoRepository.save(newPet);
    return newPet;
  }
 
  
  async updatePetStatus(petinfoinput:petinfoinput): Promise<petinfo> {
    
    const {petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
  
    if (petinfo.PetStatus == 'ava') {
      petinfo.PetStatus = 'pend';
    }

    else if (petinfo.PetStatus == 'pend') {
      petinfo.PetStatus = 'done';
    }

    await this.petInfoRepository.save(petinfo);

    return petinfo;
  }

  async removePet(petinfoinput:petinfoinput): Promise<petinfo> {
    const { petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    petinfo.PetStatus = null;
    await this.petInfoRepository.save(petinfo);
    return petinfo;
  }

  
}
  

