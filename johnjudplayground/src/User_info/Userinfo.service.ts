import { Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { ObjectID, ObjectId } from 'mongodb';
import {Userinfo} from './Userinfo.entity';
import Petinfo from '../Pets_profile/PetInfo.entity';
import { CreatePetDto } from 'src/dto/create-petinfo.dto';

@Injectable()
export class UserinfoService{
    constructor(
        @InjectRepository(Userinfo)
        private UserinfoRepository: Repository<Userinfo>,
        @InjectRepository(Petinfo)
        private PetinfoRepository: Repository<Petinfo>,
    ) {}

    async findAll(): Promise<Userinfo[]>{
        return this.UserinfoRepository.find();
    }

    async findUserId(UserId:ObjectID): Promise<Userinfo>{
        return this.UserinfoRepository.findOne({where:{_id:UserId}});
    }

    async findUserByUsername(UserName:string): Promise<Userinfo>{
        return this.UserinfoRepository.findOne({where:{UserName:UserName}});
    }

    async findUserByEmail(Email:string):Promise<Userinfo>{
        return this.UserinfoRepository.findOne({where:{Email:Email}});
    }

    async findUserIdSetting(UserId:ObjectID): Promise<Userinfo[]>{
        return this.UserinfoRepository.find({where:{_id:UserId}});
    }

    async saveUser(user:Userinfo){
        return this.UserinfoRepository.save(user);
    }

    async UpdateUserPhoneNO(UserId:ObjectID, PhoneNO: string): Promise<Userinfo>{
        const userinfo = await this.findUserId(UserId)
        userinfo.PhoneNo = PhoneNO;
        await this.UserinfoRepository.save(userinfo);

        return userinfo;
    }

    async UpdateUserEmail(UserId: ObjectID,Email: string): Promise<Userinfo>{
        const userinfo = await this.findUserId(UserId)
        userinfo.Email = Email;
        await this.UserinfoRepository.save(userinfo);

        return userinfo;
    }

    async UpdateUserInfo(UserId: ObjectID,
                        FirstName:string,
                        LastName:string,
                        Birthday:string,
                        Gender:string,
                        Address:string,
                        Facebook: string): Promise<Userinfo>{              
        const userinfo = await this.findUserId(UserId);
        userinfo.FirstName = FirstName;
        userinfo.LastName = LastName;
        userinfo.Birthday = Birthday;
        userinfo.Gender = Gender;
        userinfo.Address = Address;
        userinfo.Facebook = Facebook;
        await this.UserinfoRepository.save(userinfo);
        return userinfo;
    }

    async UpdateUserDescription(UserId: ObjectID,Description: string): Promise<Userinfo>{
        const userinfo = await this.findUserId(UserId);
        userinfo.Description = Description;
        await this.UserinfoRepository.save(userinfo);

        return userinfo;
    }

    async findAllPetRegister(UserId:ObjectID): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{UserId:UserId, regPetStatus:"register"}});
    }

    async findAllPetAdoption(UserId:ObjectID): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{ AdopUserId: UserId ,adopPetStatus:"adoption"}});
    }

    async findAllPetDonation(UserId:ObjectID): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{ UserId: UserId , regPetStatus:"donation"}});
    }

    async createPet(CreatePetDto: CreatePetDto){
        return this.PetinfoRepository.save(CreatePetDto);
    }

    async deleteUserId(id:string): Promise<void>{
        await this.UserinfoRepository.delete(id);
    }
}