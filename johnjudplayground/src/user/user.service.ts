import { Injectable,NotFoundException } from '@nestjs/common';
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
        @InjectRepository(petinfo)private petInfoRepository: Repository<petinfo>,
    
    ){}

    async CreateUser(CreateUserInput: CreateUserInput): Promise<User>{
        const {UserName, Password, FirstName, LastName, ImgURL, Birthday, Gender, PhoneNo, Email, LocationLat, LocationLong,Facebook,Address, AvgPoint, Description, TimeUpdate} = CreateUserInput;
        
        const user = this.userRepository.create({
            id: uuid(),
            UserName,
            Password,
            FirstName,
            LastName,
            ImgURL,
            Birthday,
            Gender,
            PhoneNo,
            Email,
            LocationLat,
            LocationLong,
            Facebook,
            Address,
            AvgPoint,
            Description,
            TimeUpdate
        });

        return this.userRepository.save(user);
    }

    async getUser(UserName: string): Promise<User>{
        return this.userRepository.findOne({UserName});
    }

    async findAll(): Promise<User[]> {
        const res = await this.userRepository.find();
        console.log(res);
        
        return res;
    }
    async findUserId(id:string): Promise<User>{
        const found = await this.userRepository.findOne({where:{ id }});
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }


    async findUserByUsername(UserName:string): Promise<User>{
        const found = await this.userRepository.findOne({where:{ UserName }});
        if (!found) {
            throw new NotFoundException(`Task with ID ${UserName} not found`);
        }
        return found;
    }
    

    async findUserByEmail(Email:string):Promise<User>{
        return this.userRepository.findOne({where:{Email:Email}});
    }

    async saveUser(user:User){
        return this.userRepository.save(user);
    }

    async UpdateUserPhoneNO(id:string, PhoneNO: string): Promise<User>{
        const userinfo = await this.findUserId(id);
        userinfo.PhoneNo = PhoneNO;
        await this.userRepository.save(userinfo);

        return userinfo;
    }

    async UpdateUserEmail(id: string,Email: string): Promise<User>{
        const userinfo = await this.findUserId(id);
        userinfo.Email = Email;
        await this.userRepository.save(userinfo);

        return userinfo;
    }

    async UpdateUserInfo(id: string,FirstName:string,LastName:string,Birthday:Date,Gender:string,Facebook: string,Address:string): Promise<User>{              
        const userinfo = await this.findUserId(id);
        userinfo.FirstName = FirstName;
        userinfo.LastName = LastName;
        userinfo.Birthday = Birthday;
        userinfo.Gender = Gender;
        userinfo.Facebook = Facebook;
        userinfo.Address = Address;
        await this.userRepository.save(userinfo);
        return userinfo;
    }

    async UpdateUserDescription(id: string,Description: string): Promise<User>{
        const userinfo = await this.findUserId(id);
        userinfo.Description = Description;
        await this.userRepository.save(userinfo);

        return userinfo;
    }

    async SaveImgURL(
        user: User,
        display_url: string,
        delete_url: string,
    ): Promise<object>{

        user.ImgURL = display_url;
        user.DelImgURL = delete_url;

        await this.userRepository.save(user);
        return {"success": true}
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