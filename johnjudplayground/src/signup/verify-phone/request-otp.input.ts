import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

@InputType()
export class RequestOTPInput{
    @IsNotEmpty()
    @Field()
    id: string

    @IsNotEmpty()
    @IsEmail()
    @Field()
    Email: string

    @IsNotEmpty()
    @IsPhoneNumber("TH")
    @Field()
    PhoneNo: string;
}