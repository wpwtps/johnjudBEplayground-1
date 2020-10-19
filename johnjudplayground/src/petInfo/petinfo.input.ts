import { Field, InputType } from "@nestjs/graphql";
//import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { Double } from "mongodb";

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
    PetPicURL: string;

    @Field()
    PetStatus: string;

    @Field()
    PetWeight: Double;

    @Field()
    PetCerURL: string;

}