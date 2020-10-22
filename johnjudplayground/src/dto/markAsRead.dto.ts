import { IsNotEmpty } from "class-validator";

export class MarkAsReadConversationDto{
    @IsNotEmpty()
    senderId: string;

    @IsNotEmpty()
    receiverId: string;

    @IsNotEmpty()
    createAt: Date;
}