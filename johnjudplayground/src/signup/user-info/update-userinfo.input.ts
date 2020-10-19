import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsDateString, IsEmail, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsPhoneNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";

@InputType()
export class UpdateUserInfoInput{
    @IsNotEmpty()
    @Field()
    id: string;

    @IsNotEmpty()
    @Field()
    FirstName: string;

    @IsNotEmpty()
    @Field()
    LastName: string;

    @IsNotEmpty()
    // @IsDate()
    @IsDateString()
    @Field()
    Birthday: Date;

    @IsNotEmpty()
    @Field()
    Gender: string;

    @IsNotEmpty()
    @IsPhoneNumber("TH")
    @Field()
    PhoneNo: string;

    @IsNotEmpty()
    @IsLatitude()
    @Field()
    LocationLat: string;

    @IsNotEmpty()
    @IsLongitude()
    @Field()
    LocationLong: string;

    // @IsNotEmpty()
    // @IsDateString()
    // @Field()
    // TimeUpdate: Date;
}