import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('UserInfo')
export class UserInfoType{
    @Field()
    FirstName: string;

    @Field()
    LastName: string;

    @Field()
    Birthday: Date;

    @Field()
    Gender: string;

    @Field()
    PhoneNo: string;

    @Field()
    LocationLat: string;

    @Field()
    LocationLong: string;

    @Field()
    TimeUpdate: Date;
}