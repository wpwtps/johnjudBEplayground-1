import { Body, Controller, Get, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { RequestOTPInput } from './request-otp.input';
import { VerifyOTPInput } from './verify-otp.input';
import { VerifyPhoneService } from './verify-phone.service';

@Controller('/signup')
export class VerifyPhoneController {
    constructor(
        private verifyPhoneService: VerifyPhoneService
    ){}

    @Patch('/request-OTP')
    @UsePipes(ValidationPipe)
    RequestOTP(
        @Body() RequestOTPInput: RequestOTPInput,
    ): Promise<string>{
        return this.verifyPhoneService.requestOTP(RequestOTPInput);
    }

    @Patch('/verify-phone')
    @UsePipes(ValidationPipe)
    CheckOTP(
        @Body() VerifyOTPInput: VerifyOTPInput,
    ): Promise<string>{
        return this.verifyPhoneService.checkOTP(VerifyOTPInput);
    }

}
