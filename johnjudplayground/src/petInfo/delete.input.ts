import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { Double } from "mongodb";
//import { Double } from "mongodb";
//import {User} from 'src/user/user.entity';

@InputType()
export class deleteinput{

    @Field()
    UserId: string;
    
    @Field()
    petid: string;


}