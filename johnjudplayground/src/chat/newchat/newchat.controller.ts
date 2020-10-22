import { Body, Controller, Param, Post } from "@nestjs/common";
import { ObjectID } from "mongodb";
import { CreateNewChatDto } from "./dto/create-newchat.dto";
import { NewChatService } from "./newchat.service";

@Controller('newchat')
export class ChatController{
    constructor(private NewChatService: NewChatService){}

    @Post(':senderId/:receiverId/addmessage')
    async addMessage(@Param('UserId') UserId: ObjectID,
                     @Body() CreateNewChatDto: CreateNewChatDto,
                     @Body('message') message: string){
        CreateNewChatDto.createAt = new Date();
        CreateNewChatDto.message = message;
        CreateNewChatDto.ownerId = UserId;
        CreateNewChatDto.roomId
    }
}
