import { Controller, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ConversationRepository } from './Room.repository';
import { ConversationService } from './Room.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([ConversationRepository])
    ],
    controllers: [ChatController],
    providers:[ConversationService],

})
export class ChatModule{}
