import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { Double, ObjectID } from "mongodb";

@InputType()
export class notiinput{

    @Field()
    _id: ObjectID;

    @Field()
    UserID: string;

    @IsDate()
    @Field()
    TimeStamp: Date;

    @Field()
    Content: string;

    @Field()
    Type: string;

    @IsNumber()
    @Field()
    ReadNoti: Number;
    
   // @Field()
   // NotiUnreadCount: number;
  
}
