import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateUserInput{
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

    @IsNotEmpty()
    @Field()
    FirstName: string;

    @IsNotEmpty()
    @Field()
    LastName: string;

    @IsUrl()
    @Field()
    ImgURL: string;

    @IsDateString()
    @Field()
    Birthday: string;

    @IsNotEmpty()
    @Field()
    Gender: string;

    @Length(10)
    @Field()
    PhoneNo: string;

    @IsEmail()
    @Field()
    Email: string;

    @IsNotEmpty()
    @Field()
    LocationLat: string;

    @IsNotEmpty()
    @Field()
    LocationLong: string;

    @IsNotEmpty()
    @Field()
    Facebook: string;

    @IsNotEmpty()
    @Field()
    Address: string;

    @IsNumber()
    @Field()
    AvgPoint: Number;
    
    @Field()
    Description: string;

    @IsDateString()
    @Field()
    TimeUpdate: string;
}