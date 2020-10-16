import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsNumberString, IsPhoneNumber } from "class-validator";

@InputType()
export class VerifyOTPInput{
    @IsNotEmpty()
    @Field()
    id: string

    @IsNotEmpty()
    @Field()
    Email: string

    @IsNotEmpty()
    @IsNumberString()
    @Field()
    FeedbackOTP: number

    @IsNotEmpty()
    @IsPhoneNumber("TH")
    @Field()
    PhoneNo: string;
}