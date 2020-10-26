import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

@InputType()
export class ChangePhoneInput{
    @IsNotEmpty()
    @IsPhoneNumber("TH")
    @Field()
    PhoneNo: string;
}