import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateNewChatDto } from "../dto/create-newchat.dto";
import Newchat from "./chat.entity";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController{
    constructor(private ChatService: ChatService){}

    @Post(':UserId/:roomId/addmessage')
    async addMessage(@Param('UserId') UserId: string,
                     @Param('roomId') roomId : string,
                     @Body() CreateNewChatDto: CreateNewChatDto){
        CreateNewChatDto.createAt = new Date();
        CreateNewChatDto.ownerId = UserId;
        CreateNewChatDto.roomId = roomId;
        return this.ChatService.addMessage(CreateNewChatDto);
    }

    @Get(':UserId/getusermessage')
    async getusermessage(@Param('UserId') UserId: string): Promise<Newchat>{
        return this.ChatService.getMessage(UserId)
    }

    @Get(':roomId/getmessage')
    async getAllMessageFromRoom(@Param('roomId') roomId: string): Promise<Newchat[]>{
        return this.ChatService.getAllMessageFromRoom(roomId);
    }
}