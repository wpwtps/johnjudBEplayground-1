import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UpdateLoginInfoInput } from './update-logininfo.input';
import * as bcrypt from 'bcrypt';

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

    async getUserByID(
        id: string
    ): Promise<User>{
        const found = await this.LoginInfoRepository.findOne({where:{id}});

        if(!found){
            throw new NotFoundException(`User with id "${id}" not found`);
        }

        return found
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }

    async updateUserLoginInfo(UpdateLoginInfoInput: UpdateLoginInfoInput): Promise<object>{
        // 
        // 
        // 
        
        const {id, UserName, Password,} = UpdateLoginInfoInput;

        /* check if UserName don't already exist */
        const found = await this.LoginInfoRepository.findOne({where: {UserName}});
        if(found && found.VerifyPhone){
            throw new ConflictException('Username or Account already exists!!!');
        }

        // const user = await this.getUserByEmail(Email);
        const user = await this.getUserByID(id);
        // 
        
        user.UserName = UserName;
        // user.Password = Password;
        user.salt = await bcrypt.genSalt();
        user.Password = await this.hashPassword(Password, user.salt);

                
        // 

        await this.LoginInfoRepository.save(user)

        return {"success":true, id};
    }
}
