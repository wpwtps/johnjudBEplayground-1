import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";
import { UserService } from "./user.service";
import { UserType } from "./user.type";

@Resolver(of => UserType)
export class UserResolver{
    constructor(
        private UserService: UserService,
    ){}

    @Query(returns => UserType)
    async findUser(@Args('id') id: string,){
        return this.UserService.getUser(id);
    }

    @Mutation(returns => UserType)
    async CreateUser(
        @Args('createUserInput') CreateUserInput:CreateUserInput
    ){
        return this.UserService.CreateUser(CreateUserInput);
    }
}