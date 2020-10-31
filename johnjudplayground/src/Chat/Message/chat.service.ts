import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { ObjectID, Repository } from "typeorm";
import { CreateNewChatDto } from "../dto/create-newchat.dto";
import { Chat } from "./chat.entity";

@Injectable()
export class ChatService{
    constructor(
        @InjectRepository(Chat)
            private ChatRepository: Repository<Chat>
    ) {}

    async addMessage(createNewChatDto: CreateNewChatDto){
        return this.ChatRepository.save(createNewChatDto);
    }
    
    async getMessage(UserId: string):Promise<Chat>{
        return this.ChatRepository.findOne({where:{ownerId: UserId}})
    }

    async getAllMessageFromRoom(roomid: string): Promise<Chat[]>{
        return this.ChatRepository.find({where:{roomId:roomid}})
    }
}