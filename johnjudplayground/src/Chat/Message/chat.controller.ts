import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { chatnotiDto } from "../Chatnotification/chatnotification.dto";
import Chatnoti from "../Chatnotification/chatnotification.entity";
import { CreateNewChatDto } from "../dto/create-newchat.dto";
import Newchat from "./chat.entity";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController{
    constructor(private ChatService: ChatService,
                private UserService: UserService){}

    @Post(':UserId/:roomId/addmessage')
    @UseGuards(AuthGuard())
    async addMessage(@Param('UserId') UserId: string,
                     @Param('roomId') roomId : string,
                     @GetUser() User: User,
                     @Body() CreateNewChatDto: CreateNewChatDto){
        const UserName = await this.UserService.findUserId(UserId)
        CreateNewChatDto.picUser = UserName.ImgURL
        CreateNewChatDto.ownerName = UserName.UserName
        CreateNewChatDto.createAt = new Date();
        CreateNewChatDto.ownerId = UserId;
        CreateNewChatDto.roomId = roomId;
        if(CreateNewChatDto.message == ''){
            throw new HttpException('Bad request',HttpStatus.BAD_REQUEST)
        }
        else{
            return this.ChatService.addMessage(CreateNewChatDto);
        }
    }

    @Get(':UserId/getusermessage')
    async getusermessage(@Param('UserId') UserId: string): Promise<Newchat>{
        return this.ChatService.getMessage(UserId)
    }

    @Get(':roomId/getmessage')
    async getAllMessageFromRoom(@Param('roomId') roomId: string): Promise<Newchat[]>{
        return this.ChatService.getAllMessageFromRoom(roomId);
    }

    @Post(':roomId/:UserId/noti')
    async chatnot(@Param('roomId') roomId: string,
                  @Param('UserId') UserId: string,
                  @Body() chatnotiDto: chatnotiDto){
        chatnotiDto.NotiDate = null;
        chatnotiDto.User = UserId;
        chatnotiDto.roomid = roomId;
        chatnotiDto.readAt = null;
        return this.ChatService.notichat(chatnotiDto)
    }

    @Get('getnoti')
    async getNoti(): Promise<Chatnoti[]>{
        return this.ChatService.getNoti();
    }

    @Delete(':notiId/delete')
    deleteNoti(@Param('notiId') notiId: string): Promise<void>{
        return this.ChatService.deletenoti(notiId);
    }

    @Get(':UserId/getAllnoti')
    async getAllnoti(@Param('UserId') UserId: string):Promise<Chatnoti[]>{
        return this.ChatService.getAllnoti(UserId)
    }

    @Get(':user/:roomid/getmynoti')
    async getMyNoti(@Param('user') user: string,
                    @Param('roomid') roomid: string):Promise<Chatnoti>{
        return this.ChatService.getMyNoti(user,roomid)
    }

    @Delete(':user/:roomid/deletemynoti')
    deleteMyNoti(@Param('user') user: string,
                 @Param('roomid') roomid: string): Promise<void>{
        return this.ChatService.deletenotitest(user,roomid)
    }

    @Patch(':user/:roomid/updatereaddate')
    async updateread(@Param('user') user: string,
                     @Param('roomid') roomid: string):Promise<Chatnoti>{
        return this.ChatService.updateDateNoti(user,roomid)
    }

    @Patch(':user/:roomid/updatenullnoti')
    async updatenull(@Param('user') user: string,
                     @Param('roomid') roomid: string): Promise<Chatnoti>{
        return this.ChatService.updateNullNoti(user,roomid)
    }
}