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

    async getUserByID(
        id: string
    ): Promise<User>{
        const found = await this.VerifyPhoneRepository.findOne({where:{id}});

        if(!found){
            throw new NotFoundException(`User with id "${id}" not found`);
        }

        return found
    }

    async requestOTP(RequestOTPInput: RequestOTPInput): Promise<object>{
        const {id} = RequestOTPInput;
        const OTP = await this.generateOTP();
        const user = await this.getUserByID(id);
        const PhoneNo = user.PhoneNo;

        /* check if PhoneNO don't already exist */
        const found = await this.VerifyPhoneRepository.findOne({where: {PhoneNo}});
        if(found && found.VerifyPhone){
            throw new ConflictException('PhoneNO or Account already exisits!!!');
        }
        
        user.tempOTP = OTP

        console.log(`The OTP is "${OTP}"`);       
        
        this.VerifyPhoneRepository.save(user);

        return {"success": true};
    }

    async checkOTP(VerifyOTPInput: VerifyOTPInput): Promise<object>{
        const {id, FeedbackOTP} = VerifyOTPInput;
        const user = await this.getUserByID(id);
        // console.log(user);        
        const OTP = user.tempOTP;
        const PhoneNo = user.PhoneNo;

        /* check if PhoneNO don't already exist */
        const found = await this.VerifyPhoneRepository.findOne({where: {PhoneNo}});
        if(found && found.VerifyPhone){
            throw new ConflictException('PhoneNO or Account already exisits!!!');
        }

        if(FeedbackOTP!=OTP){
            return {"success": false, "msg":"WRONG OTP!!!"};
        }

        user.VerifyPhone = true;

        await this.VerifyPhoneRepository.save(user);

        return {"success": true};
    }
}
