import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {noti} from './notification.entity';
import { notiinput } from './notification.input';

import { ObjectID } from 'mongodb';
//import {petinfo} from 'src/petInfo/petInfo.entity';


@Injectable()
export class notiService {
  constructor(
    @InjectRepository(noti)
    private notiRepository: Repository<noti>
    ){}

  async findAll(): Promise<noti[]> {
    const res = await this.notiRepository.find();
    //console.log(res);
    
    return res;
  }

  //const id = noti._id;
  //const id = "hex-string";
  async getNotiById(_id: string): Promise<noti> {
    const found = await this.notiRepository.findOne({where:{ _id }});
    //const found = await this.petInfoRepository.findByIds();
    if (!found) {
      throw new NotFoundException(`Task with ID ${ _id } not found`);
    }
    //test
    return found;
  }
  
}
