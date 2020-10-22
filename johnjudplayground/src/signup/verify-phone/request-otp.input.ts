import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

@InputType()
export class RequestOTPInput{
    @IsNotEmpty()
    @Field()
    id: string

    @IsNotEmpty()
    @IsPhoneNumber("TH")
    @Field()
    PhoneNo: string;
}