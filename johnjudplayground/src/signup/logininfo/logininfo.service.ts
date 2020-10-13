import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UpdateLoginInfoInput } from './update-logininfo.input';

@Injectable()
export class LoginInfoService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    async getUserByEmail(Email: string,): Promise<User>{
        const found = await this.userRepository.findOne({Email});

        if(!found){
            throw new NotFoundException(`User with E-MAIL "${Email}" not found`);
        }

        return found;
    }

    async updateUserLoginInfo(UpdateLoginInfoInput: UpdateLoginInfoInput, ConfirmPassword: string): Promise<User|String>{
        const {UserName, Password, FirstName, LastName, ProfilePicURL, Birthday, Gender, PhoneNo, Email, LocationLat, LocationLong, AvgPoint, Description, TimeUpdate} = UpdateLoginInfoInput;
        
        // if(Password!==ConfirmPassword){
        //     return "Password and Confirm Password don't match";
        // }

        const targetUser = await this.getUserByEmail(Email);
        // console.log(targetUser);

        targetUser.UserName = UserName;
        targetUser.Password = Password;
        // console.log(targetUser);
        
        return targetUser;
        
    }
}
