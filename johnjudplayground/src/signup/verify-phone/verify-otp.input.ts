import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

@InputType()
export class VerifyOTPInput{
    @IsNotEmpty()
    @Field()
    Email: string

    @IsNotEmpty()
    @IsNumberString()
    @Field()
    FeedbackOTP: number
}