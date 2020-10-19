import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInfoInput } from './update-userinfo.input';

@Injectable()
export class UserInfoService {
    constructor(
        @InjectRepository(User) private UserInfoRepository: Repository<User>,
    ){}

    async getUserByEmail(
        Email: string
    ): Promise<User>{
        const found = await this.UserInfoRepository.findOne({where:{Email}});

        if(!found){
            throw new NotFoundException(`User with Email "${Email}" not found`);
        }

        return found;
    }

    async getUserByID(id: string): Promise<User>{
        const found = await this.UserInfoRepository.findOne({where:{id}});

        if(!found){
            throw new NotFoundException(`User with ID "${id}" not found`)
        }

        return found;
    }

    async updateUserInfo(UpdateUserInfoInput: UpdateUserInfoInput): Promise<User>{
        const {id, FirstName, LastName, Birthday, Gender, PhoneNo, LocationLat, LocationLong,} = UpdateUserInfoInput;

        /* check if PhoneNO don't already exist */
        const found = await this.UserInfoRepository.findOne({where: {PhoneNo}});
        if(found && found.VerifyPhone){
            throw new ConflictException('PhoneNO or Account already exisits!!!')
        }

        // const user = await this.getUserByEmail(Email);
        const user = await this.getUserByID(id);

        const TimeUpdate = new Date();

        user.FirstName = FirstName;
        user.LastName = LastName;
        user.PhoneNo = PhoneNo;
        user.Birthday = Birthday;
        user.Gender = Gender;
        user.LocationLat = LocationLat;
        user.LocationLong = LocationLong;
        user.TimeUpdate = TimeUpdate;
        user.VerifyEmail = false;
        user.VerifyPhone = false;

        return this.UserInfoRepository.save(user);
    }
}
