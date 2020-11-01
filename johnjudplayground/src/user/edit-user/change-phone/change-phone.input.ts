import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

@InputType()
export class ChangePhoneInput{
    @IsNotEmpty()
    @IsPhoneNumber("TH")
    @Field()
    PhoneNo: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    accessToken: string;
}