import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateEmailUserInput{
    @Field()
    UserName: string;

    @Field()
    Password: string;

    @Field()
    FirstName: string;

    @Field()
    LastName: string;

    @Field()
    ProfilePicURL: string;

    @Field()
    Birthday: Date;

    @Field()
    Gender: string;

    @Field()
    PhoneNo: string;

    @IsNotEmpty()
    @IsEmail()
    @Field()
    Email: string;

    @Field()
    LocationLat: string;

    @Field()
    LocationLong: string;

    @Field()
    AvgPoint: Number;
    
    @Field()
    Description: string;

    @Field()
    TimeUpdate: Date;
}