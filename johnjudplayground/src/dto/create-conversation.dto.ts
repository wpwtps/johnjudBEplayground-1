import { IsNotEmpty } from "class-validator";
import { ObjectID } from "mongodb";

export class CreateConversationDto{
    
    @IsNotEmpty()
    senderId: ObjectID;

    @IsNotEmpty()
    receiverId: ObjectID;

    @IsNotEmpty()
    message: string;
}