import { IsNotEmpty } from "class-validator";
import { ObjectID } from "mongodb";

export class CreateNewRoomDto{
    @IsNotEmpty()
    bothRoomName: string[];

    @IsNotEmpty()
    bothUserId: ObjectID[];
}