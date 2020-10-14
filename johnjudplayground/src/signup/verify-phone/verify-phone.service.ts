import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RequestOTPInput } from './request-otp.input';
import { VerifyOTPInput } from './verify-otp.input';

@Injectable()
export class VerifyPhoneService {
    constructor(
        @InjectRepository(User) private VerifyPhoneRepository: Repository<User>,
    ){}

    async generateOTP(): Promise<number>{
        const OTP = Math.floor(100000+Math.random()*900000);
        // console.log(OTP);
        
        return OTP;
    }

    async getUserByEmail(
        Email: string
    ): Promise<User>{
        const found = await this.VerifyPhoneRepository.findOne({where:{Email}});        

        if(!found){
            throw new NotFoundException(`User with Email "${Email}" not found`);
        }

        return found;
    }

    async requestOTP(RequestOTPInput: RequestOTPInput): Promise<string>{
        const {Email} = RequestOTPInput;
        const OTP = await this.generateOTP();

        const user = await this.getUserByEmail(Email);
        user.tempOTP = OTP

        console.log(`The OTP is "${OTP}"`);       
        
        this.VerifyPhoneRepository.save(user);

        return "request SUCCESS";
    }

    async checkOTP(VerifyOTPInput: VerifyOTPInput): Promise<User|string>{
        const {Email, FeedbackOTP} = VerifyOTPInput;

        const user = await this.getUserByEmail(Email);
        // console.log(user);
        
        const OTP = user.tempOTP;

        if(FeedbackOTP!=OTP){
            return "WRONG OTP!!!"
        }

        user.VerifyPhone = true;

        return this.VerifyPhoneRepository.save(user);
    }


}
