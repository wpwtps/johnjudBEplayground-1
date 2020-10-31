import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsNumberString, IsPhoneNumber } from "class-validator";

@InputType()
export class VerifyOTPInput{
    @IsNotEmpty()
    @IsNumberString()
    @Field()
    FeedbackOTP: number
}