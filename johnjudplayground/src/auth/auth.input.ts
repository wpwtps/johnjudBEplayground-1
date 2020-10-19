import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl, Length, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class AuthInput{
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Field()
    UserName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak' },
    )
    @Field()
    Password: string;
}