import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('User')
export class UserType{
    @Field(type => ID)
    id: string;

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

    @Field()
    Email: string;

    @Field()
    LocationLat: string;

    @Field()
    LocationLong: string;

    @Field()
    AvgPoint: number;

    @Field()
    Description: string;

    @Field()
    TimeUpdate: Date;
} 
