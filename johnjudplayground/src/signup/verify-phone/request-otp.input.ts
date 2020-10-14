import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class RequestOTPInput{
    @IsNotEmpty()
    @IsEmail()
    @Field()
    Email: string
}