import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ObjectId, ObjectID } from "mongodb";
import { ParseObjectIdPipe } from "src/common/pipe";
import { UserinfoService } from "src/User_info/Userinfo.service";
import { CreateNewRoomDto } from "./dto/create-newroom.dto";
import { NewRoomService } from "./newroom.service";

@Controller('room')
export class ChatController{
    constructor(private NewRoomService: NewRoomService,
                private UserinfoService: UserinfoService){}

    @Post('createroom/:receiverId/:senderId')
    async createroom(@Param('receiverId',ParseObjectIdPipe) receiverId: ObjectID,
                     @Param('senderId',ParseObjectIdPipe) senderId: ObjectID,
                     @Body() CreateNewRoomDto:CreateNewRoomDto ){
        const UsernameReceiver = await this.UserinfoService.findUserId(receiverId)
        const UsernameSender = await this.UserinfoService.findUserId(senderId)
        const member:ObjectID[] = []
        const roomname:string[] = []

        member.concat(senderId)
        member.concat(receiverId)
        
        roomname.concat(UsernameSender.UserName)
        roomname.concat(UsernameReceiver.UserName)

        CreateNewRoomDto.bothUserId = member;
        CreateNewRoomDto.bothRoomName = roomname;

        return this.NewRoomService.createRoom(CreateNewRoomDto);
    }

    @Get('getRoom/:UserId')
    async getRoom(@Param('UserId',ParseObjectIdPipe) UserId: ObjectID){
        return this.NewRoomService.getRoom(UserId);
    }
}
