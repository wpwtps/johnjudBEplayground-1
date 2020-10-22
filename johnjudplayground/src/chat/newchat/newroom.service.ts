import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectID } from "mongodb";
import { Repository } from "typeorm";
import { CreateNewRoomDto } from "./dto/create-newroom.dto";
import Newroom from "./newroom.entity";

@Injectable()
export class NewRoomService{
    constructor(
        @InjectRepository(Newroom)
        private NewRoomRepository: Repository<Newroom>,
    ) {}
    
    async createRoom(createNewRoomDto: CreateNewRoomDto){
        return this.NewRoomRepository.save(createNewRoomDto);
    }

    async getRoom(UserId:ObjectID):Promise<Newroom[]>{
        const RoomUser = await this.NewRoomRepository.createQueryBuilder("Newroom")
            .where("Newroom.bothUserId IN (:bothuserid)",{bothuserid:[UserId]})
            .getMany();

        return RoomUser;
    }
}