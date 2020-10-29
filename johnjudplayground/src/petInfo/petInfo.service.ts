import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    private petInfoRepository: Repository<petinfo>,
    //private userRepository: Repository<User>
    
    @InjectRepository(User)
    private UserRepository: Repository<User>
    

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

  /*
  async myPetReg(User:User): Promise<petinfo[]>{
    //const {id} = UserInput;
    const userid = User.id;
    const found = await this.petInfoRepository.find({
      where:{UserId:userid} && {$or:[{PetStatus: 'ava'},{PetStatus:'pend'},{PetStatus:'done'}]}
    });
    return found;
  }
  */

  async createPetInfo(petinfoinput:petinfoinput, User:User): Promise<object>{
    //console.log(User);
    const { petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId,CodePet, CheckCode} = petinfoinput;
    //const {id, FirstName, LastName, Birthday, Gender, PhoneNo, LocationLat, LocationLong,} = User;
    //const User = this.petInfoRepository.getId()
    const newPet = this.petInfoRepository.create({
      petid: uuid()
    });
    
    const TimeUpdate = new Date();
    //console.log(User.id);
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
    const Userid = User.id; 
    newPet.UserId = Userid;
    //console.log(User.id);

    newPet.AdopUserId = '';
    newPet.CodePet = '';
    newPet.CheckCode = false;
    await this.petInfoRepository.save(newPet);
    return newPet;
  }
 
  /*
  async sendCodePet(petinfoinput:petinfoinput,User:User):Promise<petinfo>{
    const {petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId, CodePet, CheckCode} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    petinfo.CodePet = CodePet;
    await this.petInfoRepository.save(petinfo);
    console.log(petinfo);
    return petinfo;  
  }
  */

  async checkCode(petinfoinput:petinfoinput, User:User): Promise<petinfo>{
    const {petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId, CodePet, CheckCode} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
   
    if(petinfo.AdopUserId==petinfo.UserId){
      throw new ConflictException('Can not get your own pet')
    }
    if (CodePet===petid){
      petinfo.CodePet = CodePet;
      petinfo.CheckCode = true;
      petinfo.AdopUserId = User.id;
      petinfo.PetStatus = 'pend';
    }

    await this.petInfoRepository.save(petinfo);
    console.log(petinfo);
    return petinfo;

  }
  
  //update pend to done
  async updatePetStatus(petinfoinput:petinfoinput, User:User): Promise<petinfo> {
    
    const {petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId,CodePet, CheckCode} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    
    const userid = User.id;
    if (petinfo.UserId !== userid){
      console.log('error');
      return null ;
    }
  
    if (petinfo.PetStatus == 'ava') {
      petinfo.PetStatus = 'pend';
    }

    else if (petinfo.PetStatus == 'pend') {
      petinfo.PetStatus = 'done';
    }

    await this.petInfoRepository.save(petinfo);

    return petinfo;
  }

  async removePet(petinfoinput:petinfoinput, User:User): Promise<petinfo> {
    const { petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    const userid = User.id;
    if (petinfo.UserId !== userid){
      console.log('error');
      return null;
    }
    petinfo.PetStatus = null;
    await this.petInfoRepository.save(petinfo);
    return petinfo;
  }



  
  
}
  

