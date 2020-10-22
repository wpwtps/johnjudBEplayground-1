import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectID, Repository } from "typeorm";
import Newchat from "./newchat.entity";

@Injectable()
export class NewChatService{
    constructor(
        @InjectRepository(Newchat)
            private ChattestRepository: Repository<Newchat>
    ) {}

    async addMessage(UserId:ObjectID){
        
    }
    
    
}