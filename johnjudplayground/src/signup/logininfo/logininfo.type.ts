import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('LoginInfo')
export class LoginInfoType{
    @Field()
    UserName: string;

    @Field()
    Password: string;
}