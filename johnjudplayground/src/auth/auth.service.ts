import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthInput } from './auth.input';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    async validateUserPassword(AuthInput: AuthInput): Promise<string>{
        const {UserName, Password} = AuthInput;
        const user = await this.userRepository.findOne({UserName, VerifyPhone:true})

        if(!user){
            throw new UnauthorizedException('Invalid credentials 100');
        }else if(user && await user.validatePassword(Password)){
            return user.UserName;
        }else{
            return null;
        }


    }

    async SignIn(AuthInput: AuthInput){
        const UserName = await this.validateUserPassword(AuthInput);

        if(!UserName){
            throw new UnauthorizedException('Invalid credentials 200');
        }
    }

}
