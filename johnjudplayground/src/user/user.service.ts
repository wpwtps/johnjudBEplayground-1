import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { petinfo } from 'src/petInfo/petInfo.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(petinfo) private petInfoRepository: Repository<petinfo>,
    ){}

    async CreateUser(CreateUserInput: CreateUserInput): Promise<User>{
        const {UserName, Password, FirstName, LastName, ProfilePicURL, Birthday, Gender, PhoneNo, Email, LocationLat, LocationLong, AvgPoint, Description, TimeUpdate} = CreateUserInput;
        
        const user = this.userRepository.create({
            id: uuid(),
            UserName,
            Password,
            FirstName,
            LastName,
            ProfilePicURL,
            Birthday,
            Gender,
            PhoneNo,
            Email,
            LocationLat,
            LocationLong,
            AvgPoint,
            Description,
            TimeUpdate
        });

        return this.userRepository.save(user);
    }

    async getUser(UserName: string): Promise<User>{
        return this.userRepository.findOne({UserName});
    }

    async getPetRegCount(
        id: string,
    ){
        const all = await this.petInfoRepository.count({where: {UserId: id}});
        const deleted = await this.petInfoRepository.count({where: {UserId: id, PetStatus: "null"}});
        const res = all-deleted;

        return {res};
    }

    async getPetRegDetail(
        id: string,
    ){
        const ava = await this.petInfoRepository.find({where: {UserId: id, PetStatus: "ava"}});
        const pend = await this.petInfoRepository.find({where: {UserId: id, PetStatus: "pend"}});
        const done = await this.petInfoRepository.find({where: {UserId: id, PetStatus: "done"}});

        return {ava, pend, done};
    }

    async getPetAdoptCount(
        id: string,
    ){
        const all = await this.petInfoRepository.count({where: {AdopUserId: id}});
        const deleted = await this.petInfoRepository.count({where: {AdopUserId: id, PetStatus: "null"}});
        const res = all-deleted;

        return {res};
    }

    async getPetAdoptDetail(
        id: string,
    ){
        const pend = await this.petInfoRepository.find({where: {AdopUserId: id, PetStatus: "pend"}});
        const done = await this.petInfoRepository.find({where: {AdopUserId: id, PetStatus: "done"}});

        return {pend, done};
    }

    async getPetDonatedCount(
        id: string,
    ){
        return await this.petInfoRepository.count({where: {UserId: id, PetStatus: "done"}});
    }

    async getPetDonatedDetail(
        id: string,
    ){
        return await this.petInfoRepository.find({where: {UserId: id, PetStatus: "done"}});
    }
}
