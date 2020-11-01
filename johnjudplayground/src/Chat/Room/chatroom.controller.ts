import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import Newroom from "./chatroom.entity";
import { CreateNewRoomDto} from '../dto/create-newroom.dto'
import { UserService } from "src/user/user.service";
import { ChatRoomService } from "./chatroom.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/user/user.entity";
import { GetUser } from "src/auth/get-user.decorator";

@Controller('room')
export class RoomController{
    constructor(private ChatRoomService: ChatRoomService,
                private UserService: UserService){}

    @Post('createroom/:user1/:user2')
    // @UseGuards(AuthGuard())
    async createnewroom(@Param('user1') user1: string,
                        @Param('user2') user2: string,
                        @GetUser() User: User,
                        @Body() CreateNewRoomDto: CreateNewRoomDto){
        const username1 = await this.UserService.findUserId(user1)
        const username2 = await this.UserService.findUserId(user2)

        CreateNewRoomDto.userid1 = user1
        CreateNewRoomDto.userid2 = user2
        CreateNewRoomDto.username1 = username1.UserName
        CreateNewRoomDto.username2 = username2.UserName
        
        return this.ChatRoomService.createNewRoom(CreateNewRoomDto);
    }

    @Get(':UserId/getAllRoom')
    async getAllRoom(@Param('UserId') UserId: string): Promise<Newroom[]>{
        return this.ChatRoomService.getAllRoom(UserId);
    }

    @Get(':roomId/getRoom')
    async getRoomByRoomid(@Param('roomId') roomId: string): Promise<Newroom>{
        return this.ChatRoomService.getRoomByRoomid(roomId);
    }

    @Get(':user1/:user2/getRoom')
    async getRoomByUserId(@Param('user1') user1: string,
                          @Param('user2') user2:  string): Promise<Newroom>{
        return this.ChatRoomService.getRoomByUserid(user1,user2);
    }
}

// @Post('createroom/:receiverId/:senderId')
    // async createroom(@Param('receiverId',ParseObjectIdPipe) receiverId: ObjectID,
    //                  @Param('senderId',ParseObjectIdPipe) senderId: ObjectID,
    //                  @Body() CreateNewRoomDto:CreateNewRoomDto ){
    //     const UsernameReceiver = await this.UserinfoService.findUserId(receiverId)
    //     const UsernameSender = await this.UserinfoService.findUserId(senderId)
    //     const member:ObjectID[] = []
    //     const roomname:string[] = []

    //     member.push(senderId)
    //     member.push(receiverId)
        
    //     roomname.push(UsernameSender.UserName)
    //     roomname.push(UsernameReceiver.UserName)

    //     CreateNewRoomDto.bothUserId = member;
    //     CreateNewRoomDto.bothRoomName = roomname;

    //     return this.NewRoomService.createRoom(CreateNewRoomDto);
    // }