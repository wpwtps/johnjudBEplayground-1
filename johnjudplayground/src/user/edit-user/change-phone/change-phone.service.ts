import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ChangePhoneInput } from './change-phone.input';
import { RequestOTPInput } from './request-otp.input';
import { VerifyOTPInput } from './verify-otp.input';

@Injectable()
export class ChangePhoneService {
    constructor(
        @InjectRepository(User) private ChnagePhoneRepository: Repository<User>,
    ){}

    async saveTempPhone(
        ChangePhoneInput: ChangePhoneInput,
        user: User,
    ): Promise<object>{
        const {PhoneNo, accessToken} = ChangePhoneInput;

        const found = await this.ChnagePhoneRepository.findOne({where: {PhoneNo}});
        if(found && found.VerifyPhone){
            throw new ConflictException('PhoneNO or Account already exisits!!!');
        }

        user.tempPhone = PhoneNo;
        await this.ChnagePhoneRepository.save(user);

        // Request OTP
        var axios = require('axios');

        var config = {
        method: 'patch',
        url: 'http://localhost:2000/user/edit-user/change-phone/request-OTP',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });

        return {"success": true};
    }

    async generateOTP(): Promise<number>{
        const OTP = Math.floor(100000+Math.random()*900000);
        // console.log(OTP);
        
        return OTP;
    }

    async requestOTP(
        // RequestOTPInput:RequestOTPInput,
        user: User,
    ): Promise<object>{
        // const {PhoneNo} = RequestOTPInput;
        const PhoneNo = user.tempPhone;
        const OTP = await this.generateOTP();

        const found = await this.ChnagePhoneRepository.findOne({where: {PhoneNo, VerifyPhone: true}});
        if(found && found.VerifyPhone){
            throw new ConflictException('PhoneNO or Account already exisits!!!');
        }

        user.tempOTP = OTP;
        console.log(`The OTP is "${OTP}"`);

        await this.ChnagePhoneRepository.save(user);

        return {"success": true};        
    }

    async checkOTP(
        VerifyOTPInput: VerifyOTPInput,
        user: User,        
    ): Promise<object>{
        const PhoneNo = user.tempPhone;
        const {FeedbackOTP} = VerifyOTPInput;
        const OTP = user.tempOTP;

        const found = await this.ChnagePhoneRepository.findOne({where: {PhoneNo, VerifyPhone: true}});
        if(found && found.VerifyPhone){
            throw new ConflictException('PhoneNO or Account already exisits!!!');
        }

        if(FeedbackOTP!=OTP){
            return {"success": false, "msg": "WRONG OTP!!!"};
        }

        user.PhoneNo = user.tempPhone;

        await this.ChnagePhoneRepository.save(user);

        return {"success": true};
    }
}
