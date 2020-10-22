import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Room{
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    content: string;

    @Column()
    senderId: ObjectID;

    @Column()
    receiverId: ObjectID;

    @Column({
        type: 'varchar',
        default: new Date().toISOString(),
    })
    createdAt: string;
}