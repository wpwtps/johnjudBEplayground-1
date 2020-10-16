import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UpdateLoginInfoInput } from './update-logininfo.input';

@Injectable()
export class LoginInfoService {
    constructor(
        @InjectRepository(User) private LoginInfoRepository: Repository<User>,
    ){}

    async getUserByEmail(
        Email: string
    ): Promise<User>{
        const found = await this.LoginInfoRepository.findOne({where:{Email}});

        if(!found){
            throw new NotFoundException(`User with EMAIL "${Email}" not found`);
        }

        return found
    }

    async updateUserLoginInfo(UpdateLoginInfoInput: UpdateLoginInfoInput): Promise<User>{
        // console.log(Email);
        // console.log(UserName);
        // console.log(Password);
        
        const {UserName, Password, FirstName, LastName, ProfilePicURL, Birthday, Gender, PhoneNo, Email, LocationLat, LocationLong, AvgPoint, Description, TimeUpdate} = UpdateLoginInfoInput;

        const found = await this.LoginInfoRepository.findOne({where: {UserName}});
        if(found && found.VerifyPhone){
            throw new ConflictException('Username already exists!!!');
        }

        const user = await this.getUserByEmail(Email);
        // console.log(user);
        
        user.UserName = UserName;
        user.Password = Password;

        // console.log(user);
        

        return this.LoginInfoRepository.save(user);
    }
}
