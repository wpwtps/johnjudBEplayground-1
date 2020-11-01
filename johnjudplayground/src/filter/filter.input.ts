import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class Filterinput{

    @Field()
    type: string;

    @Field()
    MaxHeight: number;

    @Field()
    MinHeight: number;
}