import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { petinfo } from "src/petInfo/petInfo.entity";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import Chatnoti from "../Chatnotification/chatnotification.entity";
import Chatroom from "../Room/chatroom.entity";
import { ChatController } from "./chat.controller";
import Chat from "./chat.entity";
import { ChatService } from "./chat.service";


@Module({
    imports: [TypeOrmModule.forFeature([Chatroom,Chat,Chatnoti,User,petinfo]), AuthModule],

    controllers: [ChatController],
    providers: [ChatService,UserService]
})

export class ChatModule{}