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

    async UpdateUserPhoneNO(UserName:string, PhoneNO: string): Promise<User>{
        const userinfo = await this.findUserByUsername(UserName);
        userinfo.PhoneNo = PhoneNO;
        await this.userRepository.save(userinfo);

        return userinfo;
    }

    async UpdateUserEmail(UserName: string,Email: string): Promise<User>{
        const userinfo = await this.findUserByUsername(UserName);
        userinfo.Email = Email;
        await this.userRepository.save(userinfo);

        return userinfo;
    }

    async UpdateUserInfo(UserName: string,FirstName:string,LastName:string,Birthday:Date,Gender:string,Facebook: string,Address:string): Promise<User>{              
        const userinfo = await this.findUserByUsername(UserName);
        userinfo.FirstName = FirstName;
        userinfo.LastName = LastName;
        userinfo.Birthday = Birthday;
        userinfo.Gender = Gender;
        userinfo.Facebook = Facebook;
        userinfo.Address = Address;
        await this.userRepository.save(userinfo);
        return userinfo;
    }

    async UpdateUserDescription(UserName: string,Description: string): Promise<User>{
        const userinfo = await this.findUserByUsername(UserName);
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
}
