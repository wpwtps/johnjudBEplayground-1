import { IsDate, isNotEmpty, IsNotEmpty } from "class-validator";
import { ObjectID } from "mongodb";

export class CreateNewChatDto{
    @IsNotEmpty()
    ownerId: ObjectID;

    @IsNotEmpty()
    roomId: ObjectID;

    @IsNotEmpty()
    message: string;

    @IsDate()
    @IsNotEmpty()
    createAt: Date;
}