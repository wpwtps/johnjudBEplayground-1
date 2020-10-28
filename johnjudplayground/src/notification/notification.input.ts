import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { Double, ObjectID } from "mongodb";

@InputType()
export class notiinput{

    @Field()
    notiid: string;

    @Field()
    DonUserID: string;

    @Field()
    TimeStampUpdate: Date;

    @Field()
    Content: string;

    @Field()
    RequestPet: string;

    @Field()
    RecUserID: string;

    @Field()
    petid: string;

    //@IsNumber()
    //@Field()
    //ReadNoti: Number;
    
   // @Field()
   // NotiUnreadCount: number;
  
}
