import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateUserInput{
    @MinLength(8)
    @MaxLength(20)
    @Field()
    UserName: string;

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
    ProfilePicURL: string;

    @IsDate()
    @Field()
    Birthday: Date;

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

    @IsNumber()
    @Field()
    AvgPoint: Number;
    
    @Field()
    Description: string;

    @IsDate()
    @Field()
    TimeUpdate: Date;
}