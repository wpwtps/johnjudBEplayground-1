import { IsDate, isNotEmpty, IsNotEmpty } from "class-validator";
import { ObjectID } from "mongodb";
import { StringifyOptions } from "querystring";

export class CreateNewChatDto{
    
    ownerId: string;

    roomId: string;

    @IsNotEmpty()
    message: string;

    createAt: Date;
}