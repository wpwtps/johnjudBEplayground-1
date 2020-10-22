import { Body, Controller, Param, Post ,ParseIntPipe, Get,Query, ValidationPipe, Delete} from "@nestjs/common";
import { GetUser } from "src/User_info/get-user.decorator";
import { NotNullPipe } from "src/common/not-null.pipe";
import Userinfo from "src/User_info/Userinfo.entity";
import { ConversationService } from "./Room.service";
import { CreateConversationDto} from '../../dto/create-conversation.dto';
import { FilterConversation } from "src/dto/filter-conversation.dto";
import { ObjectID } from "mongodb";
import { ParseObjectIdPipe } from "src/common/pipe";
// import { MarkAsReadConversationDto } from "src/dto/markAsRead.dto";

@Controller('chat')
export class ChatController{
    constructor(private ConversationService: ConversationService){}

    @Post(':receiverId/sendMessage')
    sendMessage(@GetUser() user:Userinfo,
                @Param('receiverId',ParseObjectIdPipe) receiverId: ObjectID,
                @Body('message',NotNullPipe) message: string,
    ){
        const createConversationDto = new CreateConversationDto();
        createConversationDto.senderId = user.id;
        createConversationDto.receiverId = receiverId;
        createConversationDto.message = message;
        return this.ConversationService.saveConversation(createConversationDto);
    }

    @Get(':receiverId/messages')
    getMessage(@GetUser() user: Userinfo,
               @Param('receiverId',ParseObjectIdPipe) receiverId: ObjectID,
               @Query() filter: FilterConversation
    ){
        return this.ConversationService.getConversation(user.id,receiverId,filter);
    }

    @Get('messages')
    getMyMessages(@GetUser() user:Userinfo,
                  @Query() filter: FilterConversation,
    ){
        return this.ConversationService.getConversation(user.id,null,filter);
    }
}


//=======================================markAsRead================================================//
// @Post(':receiverId/markAsRead')
//     markAsRead(@Body(ValidationPipe) conversation: MarkAsReadConversationDto){
//         return this.ConversationService.markAllBeforeAsRead(conversation);
//     }