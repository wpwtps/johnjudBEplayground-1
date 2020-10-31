import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { petinfo } from "src/petInfo/petInfo.entity";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { RoomController } from "./chatroom.controller";
import Chatroom from "./chatroom.entity";
import { ChatRoomService } from "./chatroom.service";

@Module({
    imports: [TypeOrmModule.forFeature([Chatroom,User,petinfo]),AuthModule],
    controllers: [RoomController],
    providers: [ChatRoomService,UserService]
})

export class ChatroomModule{}