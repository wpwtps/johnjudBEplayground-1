import { Query } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserType } from "src/user/user.type";
import { CheckEmailService } from "./check-email.service";
import { CreateEmailUserInput } from "./create-email-user.input";

@Resolver(of => UserType)
export class CheckEmailResolver{
    constructor(private CheckEmailService: CheckEmailService,){}

    @Mutation(returns => UserType)
    async CreateEmailUser(
        @Args('CreateEmailUserInput') CreateEmailUserInput: CreateEmailUserInput
    ){
        return this.CheckEmailService.CreateEmailUser(CreateEmailUserInput);
    }
}