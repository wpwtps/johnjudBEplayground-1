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
        source: string,
    ): Promise<object>{
        //upload image to cloud
        var axios = require('axios');
        var FormData = require('form-data');
        var fs = require('fs');
        var data = new FormData();
        data.append('image', fs.createReadStream(source));

        var config = {
        method: 'post',
        url: 'https://api.imgbb.com/1/upload?key=1949bda7eab7e16a8e613b0c302c4782',
        headers: { 
            ...data.getHeaders()
        },
        data : data
        };
        

        const res = await axios(config);
        
        const imgURL = res.data.data.image.url;
        const delImgURL = res.data.data.delete_url;
        

        user.ImgURL = imgURL;
        user.DelImgURL = delImgURL;

        await this.userRepository.save(user);
        return {"success": true}
    }
/*
    async findAllPetRegister(id:string): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{UserId:id, regPetStatus:"register"}});
    }

    async findAllPetAdoption(id:string): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{ AdopUserId: id ,adopPetStatus:"adoption"}});
    }

    async findAllPetDonation(id:string): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{ UserId: id , regPetStatus:"donation"}});
    }
    */
}