import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Chat{
    @ObjectIdColumn()
    id?: string;

    @Column()
    message: string;

    @Column()
    ownerId: string;

    @Column()
    ownerName: string;

    @Column()
    roomId: string;

    @Column()
    createAt: Date;
}

export default Chat;