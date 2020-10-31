import { ObjectID } from "mongodb";

export class chatnotiDto{
    User: string;

    senderid: string;

    sender: string;

    NotiDate: Date;

    isread: boolean;
}