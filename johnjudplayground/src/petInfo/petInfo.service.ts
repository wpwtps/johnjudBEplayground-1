import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectID, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {petinfo} from './petInfo.entity';
import { petinfoinput } from './petinfo.input';

@Injectable()
export class petInfoService {

  constructor(
    @InjectRepository(petinfo)
    private petInfoRepository: Repository<petinfo>
    ){}

  async findAll(): Promise<petinfo[]> {
    return this.petInfoRepository.find();
      }

  async getPetById(petid: string): Promise<petinfo> {
    const found = await this.petInfoRepository.findOne({where:{petid: petid}});
    //const found = await this.petInfoRepository.findByIds();
    if (!found) {
      throw new NotFoundException(`Task with ID ${petid} not found`);
    }
    //test
    return found;
  }

  
  async updatePetStatus(petinfoinput:petinfoinput): Promise<petinfo> {
    console.log('updatePetStatus Start!!!');
    
    //console.log(PetStatus);
    const {petid, PetName, PetBreed, PetGender, PetPicURL, PetStatus, PetWeight, PetCerURL} = petinfoinput;
    console.log(petid);

    const petinfo = await this.getPetById(petid);
    // const petinfo = await this.petInfoRepository.findOne({where: {petid:2}});
    //const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    console.log(petinfo);
    petinfo.PetStatus = PetStatus;
    console.log(petinfo);
    
    return this.petInfoRepository.save(petinfo);

    //return petinfo;
    //console.log(petinfo);
    //await petinfo.save();

    //return this.petInfoRepository.findOne()
    // return petinfo;
  }
    
   /*
  async updatePetStatus(petid: number, PetStatus: string): Promise<petinfo> {
    const petinfo = await this.getPetById(petid);
    petinfo.PetStatus = PetStatus;
    petinfo.save();

    return petinfo;
  }
  */
  
}
  /*
  async updatePetStatus(petid: number, PetStatus: string): Promise<petinfo> {
    //console.log(petid);
    //console.log(PetStatus);
    
    const petinfo = await this.getPetById(petid);
    //console.log(petinfo);
    petinfo.PetStatus = PetStatus;
    //this.petInfoRepository.save(petinfo);

    //return petinfo;
    //console.log(petinfo);
    //petinfo.save();
    return this.petInfoRepository.save(petinfo);
  }
*/

  /*

  async updatePetStatus(updatePetStatus:updatePetStatus): Promise<petinfo> {
    //console.log(petid);
    //console.log(PetStatus);
    const {UserName, Password, FirstName, LastName, ProfilePicURL, Birthday, Gender, PhoneNo, Email, LocationLat, LocationLong, AvgPoint, Description, TimeUpdate} = updatePetStatus;
    const petinfo = await this.getPetById(petid);
    //console.log(petinfo);
    petinfo.PetStatus = PetStatus;
    //this.petInfoRepository.save(petinfo);

    //return petinfo;
    //console.log(petinfo);
    //petinfo.save();
    return this.petInfoRepository.save(petinfo);
  }
  */



  
  /*
  async updatePetStatus(petinfo: { id: ObjectID, PetName: String, PetStatus: String; }) {
    const updatePetInfo = await this.petInfoRepository.findPet(petinfo.id);
    updatePetInfo.PetStatus = petinfo.PetStatus;
  }
*/ 
  
/*
  findOne(id: string): Promise<petinfo> {
    return this.petInfoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updatePetStatus(petinfo: { id: string | number | Date | ObjectID; PetStatus: string; }) {
    const updatePetInfo = await this.petInfoRepository.findOne(petinfo.id);
    updatePetInfo.PetStatus = petinfo.PetStatus;
  }
*/

  //async update(petinfo:petinfo): Promise<petinfo> {
  //  return await this.petInfoRepository.update(petinfo.id, petinfo);




