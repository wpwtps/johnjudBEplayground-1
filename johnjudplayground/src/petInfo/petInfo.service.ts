import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectID, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {petinfo} from 'src/petinfo/petInfo.entity';
import { petinfoinput } from './petinfo.input';

@Injectable()
export class petInfoService {

  constructor(
    @InjectRepository(petinfo)
    private petInfoRepository: Repository<petinfo>
    ){}

  async findAll(): Promise<petinfo[]> {
    const res = await this.petInfoRepository.find();
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

  /*
  async nextStatus(): Promise<string>{
    const PetStatus;

  }
  */
  
  async updatePetStatus(petinfoinput:petinfoinput): Promise<petinfo> {
    console.log('updatePetStatus Start!!!');
    
    //console.log(PetStatus);
    const {petid, PetName, PetBreed, PetGender, PetPicURL, PetStatus, PetWeight, PetCerURL} = petinfoinput;
    console.log(petid);

    const petinfo = await this.getPetById(petid);
    // const petinfo = await this.petInfoRepository.findOne({where: {petid:2}});
    //const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    //console.log(petinfo);
    if (petinfo.PetStatus == 'available') {
      petinfo.PetStatus = 'pending';
      console.log(petinfo);
    }

    else if (petinfo.PetStatus == 'pending') {
      petinfo.PetStatus = 'done';
    }
    //petinfo.PetStatus = PetStatus;
    console.log(petinfo);
    await this.petInfoRepository.save(petinfo);

    return petinfo;
  }
  
}
  

