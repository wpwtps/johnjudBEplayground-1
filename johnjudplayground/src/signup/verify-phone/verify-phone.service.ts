import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getUserByID(
        id: string
    ): Promise<User>{
        const found = await this.VerifyPhoneRepository.findOne({where:{id}});

        if(!found){
            throw new NotFoundException(`User with id "${id}" not found`);
        }

        return found
    }

    async requestOTP(RequestOTPInput: RequestOTPInput): Promise<string>{
        const {id, PhoneNo} = RequestOTPInput;
        const OTP = await this.generateOTP();
        const user = await this.getUserByID(id);

        /* check if PhoneNO don't already exist */
        const found = await this.VerifyPhoneRepository.findOne({where: {PhoneNo}});
        if(found && found.VerifyPhone){
            throw new ConflictException('PhoneNO or Account already exisits!!!');
        }
        
        user.tempOTP = OTP

        console.log(`The OTP is "${OTP}"`);       
        
        this.VerifyPhoneRepository.save(user);

        return "request SUCCESS";
    }

    async checkOTP(VerifyOTPInput: VerifyOTPInput): Promise<User|string>{
        const {id, PhoneNo, FeedbackOTP} = VerifyOTPInput;
        const user = await this.getUserByID(id);
        // console.log(user);        
        const OTP = user.tempOTP;

        /* check if PhoneNO don't already exist */
        const found = await this.VerifyPhoneRepository.findOne({where: {PhoneNo}});
        if(found && found.VerifyPhone){
            throw new ConflictException('PhoneNO or Account already exisits!!!');
        }

        if(FeedbackOTP!=OTP){
            return "WRONG OTP!!!"
        }

        user.VerifyPhone = true;

        return this.VerifyPhoneRepository.save(user);
    }


}
