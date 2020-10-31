import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { ObjectID, Repository } from "typeorm";
import { chatnotiDto } from "../Chatnotification/chatnotification.dto";
import Chatnoti from "../Chatnotification/chatnotification.entity";
import { CreateNewChatDto } from "../dto/create-newchat.dto";
import { Chat } from "./chat.entity";

@Injectable()
export class ChatService{
    constructor(
        @InjectRepository(Chat)
            private ChatRepository: Repository<Chat>,
        @InjectRepository(Chatnoti)
            private ChatNotiRepository: Repository<Chatnoti>
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

    async getNotibyUserAndSender(User:string,Sender:string):Promise<Chatnoti>{
        return this.ChatNotiRepository.findOne({where:{User:User,sender:Sender}})
    }
    
    async chatnoti(chatnotidto: chatnotiDto){
        const exist = await this.getNotibyUserAndSender(chatnotidto.User,chatnotidto.sender)
        if(!exist){
            return this.ChatNotiRepository.save(chatnotidto)
        }
        else{
            throw new HttpException('Bad request',HttpStatus.BAD_REQUEST)
        }
    }
}