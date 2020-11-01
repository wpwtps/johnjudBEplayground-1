import { IsDate, isNotEmpty, IsNotEmpty } from "class-validator";
import { ObjectID } from "mongodb";
import { StringifyOptions } from "querystring";

export class CreateNewChatDto{
    
    ownerId: string;

    ownerName: string;

    roomId: string;

    picUser: string;

    @IsNotEmpty()
    message: string;

    createAt: Date;
}