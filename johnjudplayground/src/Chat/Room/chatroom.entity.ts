import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Chatroom{
    @ObjectIdColumn()
    id?: string;

    @Column()
    userid1 : string;

    @Column()
    userid2 : string;

    @Column()
    username1 : string;

    @Column()
    username2 : string;

    @Column()
    readAt : Date;
}

export default Chatroom;