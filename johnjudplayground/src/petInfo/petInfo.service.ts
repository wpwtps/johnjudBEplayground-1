import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectID, Repository, Not, IsNull, ObjectType} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {petinfo} from './petInfo.entity';
import {User} from 'src/user/user.entity';
import { petinfoinput } from './petinfo.input';
import { notiinput } from 'src/notification/notification.input';
import { v4 as uuid } from 'uuid';

import { notiService } from 'src/notification/notification.service';

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
    
    return res;
  }

  //find only pet show in webApp, del pet not in this case
  async findPetInWeb(): Promise<petinfo[]> {
    //console.log('findPetWeb');
    //const res = await this.petInfoRepository.find({where:{ PetStatus: Not("delete") }});
    const res = await this.petInfoRepository.find({
        where:{$or:[{PetStatus: 'ava'},{PetStatus:'pend'},{PetStatus:'done'}]}
      });
    console.log(res);
    
    return res;
  }

  async findPetHP(): Promise<petinfo[]> {
    const res = await this.petInfoRepository.find({
        where:{PetStatus: 'ava'}
      });
    
    return res;
  }

  async findPetHPrec(userid:string): Promise<petinfo[]> {
    const res = await this.petInfoRepository.find({
        where:{
          $and:[{PetStatus: 'ava'}, {UserId:{$not:{$eq:userid}}}]
        }
      });
    
    return res;
  }

  async findPetHPdon(userid:string): Promise<petinfo[]> {
    const res = await this.petInfoRepository.find({
        where:{
          $and:[{PetStatus: 'ava'}, {UserId:{$eq:userid}}]
        }
          
      });
    
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

  async createPetInfo(petinfoinput:petinfoinput, User:User): Promise<object>{
    //console.log(User);
    const { petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId,CodePet, CheckCode,TimeUpdate,Describe,PetAddress} = petinfoinput;
    const newPet = this.petInfoRepository.create({
      petid: uuid()
    });
    
    const TimePost = new Date();
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
    newPet.TimeStampUpdate = TimePost;

    //edit after as User Entity
    const Userid = User.id; 
    newPet.UserId = Userid;
    //console.log(User.id);

    newPet.AdopUserId = '';
    newPet.CodePet = '';
    newPet.CheckCode = false;
    newPet.TimeUpdate = TimePost;
    newPet.Describe = Describe;
    newPet.PetAddress = PetAddress;
    await this.petInfoRepository.save(newPet);
    return newPet;
  }
 

  async checkCode(petinfoinput:petinfoinput, User:User): Promise<petinfo>{
    const {petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId, CodePet, CheckCode,TimeUpdate,Describe,PetAddress} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    
    if(petinfo.AdopUserId===petinfo.UserId){
      throw new ConflictException('Can not get your own pet')
    }
    if (CodePet===petid){
      petinfo.CodePet = CodePet;
      petinfo.CheckCode = true;
      petinfo.AdopUserId = User.id;
      petinfo.PetStatus = 'pend';
      //await this.notiSer
    }
    await this.petInfoRepository.save(petinfo);
    console.log(petinfo);
    return petinfo;

  }
  
  //update pend to done
  async updatePetStatus(petinfoinput:petinfoinput, User:User): Promise<petinfo> {
    
    const {petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId,CodePet, CheckCode,TimeUpdate,Describe,PetAddress} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    const userid = User.id;

    if (petinfo.UserId !== userid){
      console.log('error');
      return null ;
    }
    /*
    if (petinfo.PetStatus == 'ava') {
      petinfo.PetStatus = 'pend';
    }
    */
    if (petinfo.PetStatus == 'pend') {
      petinfo.PetStatus = 'done';
    }
    await this.petInfoRepository.save(petinfo);
    return petinfo;
  }

  async removePet(petinfoinput:petinfoinput, User:User): Promise<petinfo> {
    const { petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId, CheckCode,TimeUpdate,Describe,PetAddress} = petinfoinput;
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

    
  async editPet(petinfoinput:petinfoinput, User:User): Promise<petinfo> {
    console.log('edit start');
    const { petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId, CheckCode,TimeUpdate,Describe, PetAddress} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    console.log(petinfo);
    const userid = User.id;
    if (petinfo.UserId !== userid){
      console.log('this accout is not pet owner')
      throw new ConflictException('You dont have permission to edit this pet')  
    }
    const today = new Date();
    const postday = petinfo.TimeStampUpdate;
    let fromDate = new Date(Date.now() - 60 * 60 * 24 * 2 * 1000);
    console.log(fromDate);
    if (fromDate>postday){
      console.log('can not edit')
      throw new ConflictException('Editing time is up')
    }

    petinfo.PetName = PetName;
    petinfo.PetBreed = PetBreed;
    petinfo.PetGender = PetGender;
    petinfo.Type = Type;
    petinfo.PetPicURL = PetPicURL;
    petinfo.PetLength = PetLength;
    petinfo.PetHeight = PetHeight;
    petinfo.PetCerURL = PetCerURL;
    petinfo.TimeUpdate = today;
    petinfo.Describe = Describe;
    petinfo.PetAddress = PetAddress;

    await this.petInfoRepository.save(petinfo);
    console.log(petinfo);
    return petinfo;
  }
  


  
  
}
  

