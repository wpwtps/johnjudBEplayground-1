import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Newchat{
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    message: string;

    @Column()
    owner: ObjectID;

    @Column()
    roomId: ObjectID;

    @Column({
        type: 'varchar',
        default: new Date().toISOString(),
    })
    createdAt: string;
}

export default Newchat;