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

//============================================ChatNotification==============================================================//

    async getNotibyRoomidAndUser(User:string,roomId:string):Promise<Chatnoti>{
        return this.ChatNotiRepository.findOne({where:{User:User,roomid:roomId}})
    }

    async notichat(chatnotiDto: chatnotiDto): Promise<Chatnoti>{
        const exist = await this.getNotibyRoomidAndUser(chatnotiDto.User,chatnotiDto.roomid)
        if(!exist){
            return this.ChatNotiRepository.save(chatnotiDto)
        }
        else{
            throw new HttpException('Bad request',HttpStatus.BAD_REQUEST)
        }
    }

    async getNoti(): Promise<Chatnoti[]>{
        return this.ChatNotiRepository.find()
    }

    async deletenoti(id:string): Promise<void>{
        await this.ChatNotiRepository.delete(id);
    }
}