import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";
//import { Double } from "mongodb";
//import {User} from 'src/user/user.entity';

@InputType()
export class petinfoinput{

    @Field()
    petid: string;

    @Field()
    PetName: string;

    @Field()
    PetBreed: string;

    @Field()
    PetGender: string;

    @Field()
    Type: string;

    @Field()
    PetPicURL: string;

    @Field()
    PetStatus: string;

    @Field()
    PetLength: number;

    @Field()
    PetHeight: number;

    @Field()
    PetCerURL: string;

    @Field()
    TimeStampUpdate: Date;

    @Field()
    UserId: string;

    @Field()
    AdopUserId: string;

}