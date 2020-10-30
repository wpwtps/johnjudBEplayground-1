import { Body, Controller, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UpdateUserInfoInput } from './update-userinfo.input';
import { UserInfoService } from './user-info.service';

@Controller('/signup/user-info')
export class UserInfoController {
    constructor(
        private userInfoService: UserInfoService
    ){}

    @Patch()
    @UsePipes(ValidationPipe)
    UserInfo(
        @Body() UpdateUserInfoInput: UpdateUserInfoInput,
    ): Promise<object>{
        return this.userInfoService.updateUserInfo(UpdateUserInfoInput);
    }
}
