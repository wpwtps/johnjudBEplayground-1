import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterInput } from './register.input';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(User) private registerRepository: Repository<User>,
    ){}

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }

    async createAccount(RegisterInput: RegisterInput): Promise<object>{
        const {UserName, Password, FirstName, LastName, Birthday, Gender, PhoneNo, Email, Address, } = RegisterInput;


        //check if the account isn't duplicate from others
        const foundUsername = await this.registerRepository.findOne({where:{UserName: UserName, VerifyPhone: true}});
        if(foundUsername){
            throw new ConflictException('This username already exists!!!');
        }

        const foundPhone = await this.registerRepository.findOne({where:{PhoneNo: PhoneNo, VerifyPhone: true}});
        if(foundPhone){
            throw new ConflictException('This phone number already exists!!!');
        }

        const foundEmail = await this.registerRepository.findOne({where:{Email: Email, VerifyPhone: true}});
        if(foundEmail){
            throw new ConflictException('This email already exists!!!');
        }


        //create new user
        const salt = await bcrypt.genSalt();
        const user = this.registerRepository.create({
            id: uuid(),
            UserName: UserName,
            salt : await bcrypt.genSalt(),
            Password: await this.hashPassword(Password, salt),
            FirstName: FirstName,
            LastName: LastName,
            Birthday: Birthday,
            Gender: Gender,
            PhoneNo: PhoneNo,
            Email: Email,
            Address: Address,
            VerifyPhone: false,
        })

        await this.registerRepository.save(user);


        //Request OTP
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
        'id': `${user.id}` 
        });

        var config = {
        method: 'patch',
        url: 'http://localhost:2000/signup/v2/request-OTP',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });


        const id = user.id;

        return {"success": true, id};
    }
}
