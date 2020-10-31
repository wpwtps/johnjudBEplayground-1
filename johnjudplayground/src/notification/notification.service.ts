import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {noti} from './notification.entity';
import {User} from 'src/user/user.entity';
import {petinfo} from 'src/petInfo/petInfo.entity';
import { notiinput } from './notification.input';
import { v4 as uuid } from 'uuid';
import { petinfoinput } from 'src/petInfo/petinfo.input';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';


//import { ObjectID } from 'mongodb';
//import {petinfo} from 'src/petInfo/petInfo.entity';


@Injectable()
export class notiService {
  static createNoti() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(noti)
    private notiRepository: Repository<noti>,

    @InjectRepository(User)
    private UserRepository: Repository<User>,

    @InjectRepository(petinfo)
    private petInfoRepository: Repository<petinfo>
    ){}

    //@InjectRepository(User)
    //private UserRepository: Repository<User>
    //){}

  async findAll(): Promise<noti[]> {
    const res = await this.notiRepository.find();
    //console.log(res);
    
    return res;
  }

  async getNotiById(notiid: string): Promise<noti> {
    const found = await this.notiRepository.findOne({where:{notiid}});
    //const found = await this.petInfoRepository.findByIds();
    if (!found) {
      throw new NotFoundException(`Task with ID ${ notiid } not found`);
    }
    //test
    console.log(found);
    return found;
  }

  //ขึ้นโนติที่ผู้ให้ว่า rec ยืนยันการรับสัตว์แล้ว petinfo.CheckCode = true;
  //ต้องมีการเช็คว่าถ้าเกิด petinfo.CheckCode = true; ถึงจะเข้ามาคำสั่งนี้
  async createNoti(petinfoinput:petinfoinput,User:User):Promise<object>{
    //const {notiid,DonUserID,TimeStampUpdate,RequestPet,RecUserID,petid} = notiinput;
    const {petid,PetName,PetBreed,PetGender,Type,PetPicURL,PetStatus,PetLength,PetHeight, PetCerURL,TimeStampUpdate, UserId,AdopUserId,CodePet, CheckCode,TimeUpdate} = petinfoinput;
    const petinfo = await this.petInfoRepository.findOne({where:{petid}});
    const newNoti = this.notiRepository.create({
      notiid: uuid(),
    });
    const Userid = User.id; 
    if(petinfo.CheckCode===false){
      console.log('code error');
      throw new ConflictException('wrong code, please try again');
    }
    if(petinfo.AdopUserId==petinfo.UserId){
      throw new ConflictException('Can not get your own pet')
    }
    if(Userid!==petinfo.UserId){
      throw new ConflictException('wrong user')
    }
    console.log(petinfo);
    const TimeNoti = new Date();
    console.log("create");
    newNoti.DonUserID = petinfo.UserId; 
    newNoti.TimeStampUpdate = TimeNoti;
    //newNoti.RequestPet = '';
    newNoti.RecUserID = petinfo.AdopUserId;
    newNoti.petid = petid;
    await this.notiRepository.save(newNoti);
    return newNoti;
  }

  
  // async createNoti(notiinput:notiinput , User:User):Promise<object>{
  //   const {notiid,DonUserID,TimeStampUpdate,RequestPet,RecUserID,petid} = notiinput;
  //   const newNoti = this.notiRepository.create({
  //     notiid: uuid(),
  //   });

  //   const TimeUpdate = new Date();
  //   console.log("create");
  //   const Userid = User.id; 
  //   newNoti.DonUserID = Userid; 
  //   newNoti.TimeStampUpdate = TimeUpdate;
  //   newNoti.RequestPet = '';
  //   newNoti.RecUserID = RecUserID;
  //   newNoti.petid = petid;
  //   await this.notiRepository.save(newNoti);
  //   return newNoti;
  // }
 
//  async createNoti(notiinput:notiinput, User:User): Promise<object>{
//   const {notiid,DonUserID,TimeStampUpdate,RequestPet,RecUserID,petid} = notiinput;
//   const newNoti = this.notiRepository.create({
//     notiid: uuid(),
//   });
//   const TimeUpdate = new Date();

//  }
 

  
  async findUSerID(UserName:string): Promise<User>{
    const found = await this.UserRepository.findOne({where:{UserName}});
    return found;

  }
  

  

  
  
 
  
}
