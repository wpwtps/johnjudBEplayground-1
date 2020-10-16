import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";

@InputType()
export class UpdateLoginInfoInput{
    @IsNotEmpty()
    @Field()
    id: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Field()
    UserName: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Field()
    Password: string;
}