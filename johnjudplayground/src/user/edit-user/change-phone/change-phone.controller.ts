import { Body, Controller, Header, Headers, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { ChangePhoneInput } from './change-phone.input';
import { ChangePhoneService } from './change-phone.service';
import { RequestOTPInput } from './request-otp.input';
import { VerifyOTPInput } from './verify-otp.input';

@Controller('/user/edit-user/change-phone')
export class ChangePhoneController {
    constructor(
        private ChangePhoneService: ChangePhoneService,
    ){}

    @Patch('/save-temp-phone')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    ChangePhone(
        @Body() ChangePhoneInput: ChangePhoneInput,
        @GetUser() user: User,
    ): Promise<object>{
        return this.ChangePhoneService.saveTempPhone(ChangePhoneInput, user);
    }

    @Patch('/request-OTP')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    RequestOTP(
        // @Body() RequestOTPInput: RequestOTPInput,
        @GetUser() user: User,
    ): Promise<object>{
        return this.ChangePhoneService.requestOTP(user);
    }

    @Patch('/verify-phone')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    CheckOTP(
        @Body() VerifyOTPInput: VerifyOTPInput,
        @GetUser() user: User,
    ): Promise<object>{
        return this.ChangePhoneService.checkOTP(VerifyOTPInput, user);
    }
}
