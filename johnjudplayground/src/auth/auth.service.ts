import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthInput } from './auth.input';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private JwtService: JwtService,
    ){}

    async validateUserPassword(AuthInput: AuthInput): Promise<string>{
        const {UserName, Password} = AuthInput;
        const user = await this.userRepository.findOne({UserName, VerifyPhone:true})

        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }else if(user && await user.validatePassword(Password)){
            return user.UserName;
        }else{
            return null;
        }
    }

    async SignIn(AuthInput: AuthInput){
        const UserName = await this.validateUserPassword(AuthInput);

        if(!UserName){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = {UserName};
        const accessToken = await this.JwtService.sign(payload);


        //Get User's basic information
        var axios = require('axios');

        var config = {
        method: 'get',
        url: 'http://localhost:2000/signin/get-basic',
        headers: { 
            'Authorization': `Bearer ${accessToken}` 
        }
        };

        const res = await axios(config);
        const data = res.data;
        return {"accessToken": accessToken, "id": data.id, "UserName": data.UserName};
    }

    async getBasicInfo(
        user: User,
    ){
        const id = user.id;
        const UserName = user.UserName;

        return {"id": id, "UserName": UserName};
    }
}
