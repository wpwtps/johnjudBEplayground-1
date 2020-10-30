import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UpdateUserInfoInput } from "./update-userinfo.input";
import { UserInfoService } from "./user-info.service";
import { UserInfoType } from "./user-info.type";

@Resolver(of => UserInfoType)
export class UserInfoResolver{
    constructor(private UserInfoService: UserInfoService,){}

    @Mutation(returns => UserInfoType)
    updateUserInfo(
        @Args('UpdateUserInfoInput') UpdateUserInfoInput: UpdateUserInfoInput,
    ){
        return this.UserInfoService.updateUserInfo(UpdateUserInfoInput);
    }
}