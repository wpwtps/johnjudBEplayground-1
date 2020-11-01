import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class Filterinput{

    @Field()
    type: string;

    @Field()
    Height: number;
}