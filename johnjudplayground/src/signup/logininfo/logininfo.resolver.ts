import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { LoginInfoService } from "./logininfo.service";
import { LoginInfoType } from "./logininfo.type";
import { UpdateLoginInfoInput } from "./update-logininfo.input";

@Resolver(of => LoginInfoType)
export class LoginInfoResolver{
    constructor(private LoginInfoService: LoginInfoService,)
    {}

    @Mutation(returns => LoginInfoType)
    updateUserLoginInfo(
        @Args('UpdateLoginInfoInput') UpdateLoginInfoInput: UpdateLoginInfoInput,
    ){
        // const {UserName, Password, Email} = UpdateLoginInfoInput;
        return this.LoginInfoService.updateUserLoginInfo(UpdateLoginInfoInput);
    }
}