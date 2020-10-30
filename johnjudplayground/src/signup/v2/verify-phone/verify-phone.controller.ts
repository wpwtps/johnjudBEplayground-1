import { Body, Controller, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { RequestOTPInput } from './request-otp.input';
import { VerifyOTPInput } from './verify-otp.input';
import { VerifyPhoneService } from './verify-phone.service';

@Controller('/signup/v2')
export class VerifyPhoneController {
    constructor(
        private verifyPhoneService: VerifyPhoneService
    ){}

    @Patch('/request-OTP')
    @UsePipes(ValidationPipe)
    RequestOTP(
        @Body() RequestOTPInput: RequestOTPInput,
    ): Promise<object>{
        return this.verifyPhoneService.requestOTP(RequestOTPInput);
    }

    @Patch('/verify-phone')
    @UsePipes(ValidationPipe)
    CheckOTP(
        @Body() VerifyOTPInput: VerifyOTPInput,
    ): Promise<object>{
        return this.verifyPhoneService.checkOTP(VerifyOTPInput);
    }
}
