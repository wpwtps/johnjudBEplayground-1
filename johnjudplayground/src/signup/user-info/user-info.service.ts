import { Injectable, NotFoundException } from '@nestjs/common';
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

    async updateUserInfo(UpdateUserInfoInput: UpdateUserInfoInput): Promise<User>{
        const {UserName, Password, FirstName, LastName, ProfilePicURL, Birthday, Gender, PhoneNo, Email, LocationLat, LocationLong, AvgPoint, Description, TimeUpdate} = UpdateUserInfoInput;

        const user = await this.getUserByEmail(Email);

        user.FirstName = FirstName;
        user.LastName = LastName;
        user.PhoneNo = PhoneNo;
        user.Birthday = Birthday;
        user.Gender = Gender;
        user.LocationLat = LocationLat;
        user.LocationLong = LocationLong;
        user.TimeUpdate = TimeUpdate;

        return this.UserInfoRepository.save(user);
    }
}
