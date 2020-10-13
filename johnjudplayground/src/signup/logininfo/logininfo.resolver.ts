import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserType } from "src/user/user.type";
import { LoginInfoService } from "./logininfo.service";
import { UpdateLoginInfoInput } from "./update-logininfo.input";

@Resolver(of => UserType)
export class UpdateUserLoginInfoResolver{
    constructor(private LoginInfoService: LoginInfoService,){}

    @Mutation(returns => UserType)
    async UpdateUserLoginInfo(
        @Args('UpdateLoginInfoInput') UpdateLoginInfoInput: UpdateLoginInfoInput,
        @Args('ConfirmPassword') ConfirmPassword: string
    ){
        return this.LoginInfoService.updateUserLoginInfo(UpdateLoginInfoInput, ConfirmPassword);
    }
}