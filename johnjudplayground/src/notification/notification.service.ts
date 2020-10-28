import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {noti} from './notification.entity';
import {User} from 'src/user/user.entity';
import {petinfo} from 'src/petInfo/petInfo.entity';
import { notiinput } from './notification.input';
import { v4 as uuid } from 'uuid';


//import { ObjectID } from 'mongodb';
//import {petinfo} from 'src/petInfo/petInfo.entity';


@Injectable()
export class notiService {
  constructor(
    @InjectRepository(noti)
    private notiRepository: Repository<noti>,

    @InjectRepository(User)
    private UserRepository: Repository<User>,

    @InjectRepository(petinfo)
    private petinfoRepository: Repository<petinfo>
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

  async createNoti(notiinput:notiinput, User:User):Promise<object>{
    const {notiid,DonUserID,TimeStampUpdate,Content,RequestPet,RecUserID,petid} = notiinput;
    const newNoti = this.notiRepository.create({
      notiid: uuid(),
    });

    const TimeUpdate = new Date();
    console.log("create");
    const Userid = User.id; 
    newNoti.DonUserID = Userid;
    newNoti.TimeStampUpdate = TimeUpdate;
    newNoti.Content = 'accept?';
    newNoti.RequestPet = '';
    newNoti.RecUserID = RecUserID;
    newNoti.petid = petid;
    await this.notiRepository.save(newNoti);
    return newNoti;
  }

  
  async findUSerID(UserName:string): Promise<User>{
    const found = await this.UserRepository.findOne({where:{UserName}});
    return found;

  }
  

  async acceptNoti(notiinput:notiinput, User:User): Promise<noti>{

    const {notiid,DonUserID,TimeStampUpdate,Content,RequestPet,RecUserID,petid} = notiinput;
    const noti = await this.notiRepository.findOne({where:{notiid}});
    //const UserPF = await this.UserRepository.findOne({where:{UserName: RecUserID}});
    const Petinfo = await this.petinfoRepository.findOne({where:{petid:petid}});

    const userid = User.id;
    //console.log(userid);
    //console.log(noti.RecUserID);
    if (noti.RecUserID !== userid){
      console.log('error');
      return null;
    }

    //if (noti.RecUserID === userid && noti.petid)
    noti.RequestPet = 'yes';
    console.log(noti.petid);
    console.log(noti.RecUserID);
    //console.log(Petinfo.AdopUserId);
    //Petinfo.AdopUserId = noti.RecUserID;
    //await this.petinfoRepository.save(Petinfo);
    await this.notiRepository.save(noti);
    return noti;
  }

  async cancelNoti(notiinput:notiinput, User:User): Promise<noti>{

    const {notiid,DonUserID,TimeStampUpdate,Content,RequestPet,RecUserID,petid} = notiinput;
    const noti = await this.notiRepository.findOne({where:{notiid}});

    const userid = User.id;
    if (noti.RecUserID !== userid){
      console.log('error');
      return null;
    }
    noti.RequestPet = 'no';

    await this.notiRepository.save(noti);
    return noti;
  }
  
 
  
}
