import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectID } from "mongodb";
import { CreateConversationDto } from "src/dto/create-conversation.dto";
import { FilterConversation } from "src/dto/filter-conversation.dto";
import { MarkAsReadConversationDto } from "src/dto/markAsRead.dto";
import Userinfo from "src/User_info/Userinfo.entity";
import { Repository } from "typeorm";
import { Room } from "./Room.entity";
import { ConversationRepository } from "./Room.repository";

@Injectable()
export class ConversationService{
    constructor(
    @InjectRepository(ConversationRepository)
    private ConversationRepository: ConversationRepository,
    ){}

    async getConversation(
        senderId: ObjectID,
        receiverId: ObjectID,
        filter: FilterConversation): Promise<Room[]>{
        return this.ConversationRepository.getConversation(senderId,receiverId,filter);
    }

    async saveConversation(CreateConversationDto: CreateConversationDto){
        return await this.ConversationRepository.saveConversation(CreateConversationDto);
    }
}





//====================================delete=============================================//
// async deleteConversation(conversationId: ,user:Userinfo){
//     return this.ConversationRepository.deleteConversation(conversationId,user);
// }

//==================================markBeforeRead========================================//
// async markAllBeforeAsRead(conversation: MarkAsReadConversationDto){
//     return this.ConversationRepository.markAllBeforeAsRead(conversation);
// }