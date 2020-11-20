import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId, ObjectID } from "mongodb";
import { Repository } from "typeorm";
import { CreateNewRoomDto } from "../dto/create-newroom.dto";
import {getMongoRepository} from "typeorm";
import Chatroom from "./chatroom.entity";

@Injectable()
export class ChatRoomService{
    constructor(
        @InjectRepository(Chatroom)
        private NewRoomRepository: Repository<Chatroom>,
    ) {}
    

    async createNewRoom(createNewRoomDto: CreateNewRoomDto){
        const roomexist = await this.getRoomByUserid(createNewRoomDto.userid1,createNewRoomDto.userid2)
        if(roomexist){
            return roomexist
        }
        else{
            return this.NewRoomRepository.save(createNewRoomDto);
        }
    }

    async getAllRoom(UserId:string):Promise<Chatroom[]>{
        const NewroomRepo = getMongoRepository(Chatroom);
        const getAll = await NewroomRepo.find({
            where:{
                $or:[
                    {userid1: UserId},
                    {userid2: UserId}
                ]
            }
        })
        return getAll;
    }

    async getRoomByRoomid(RoomId: string): Promise<Chatroom>{
        return this.NewRoomRepository.findOne({where:{id:RoomId}})
    }

    async getRoomByUserid(user1: string,user2: string): Promise<Chatroom>{
        const RoomRepo = getMongoRepository(Chatroom);
        const getRoom = await RoomRepo.findOne({
            where:{
                $or:[
                    {userid1:user1,userid2:user2},
                    {userid1:user2,userid2:user1}
                ]
            }
        })
        return getRoom;
    }
}