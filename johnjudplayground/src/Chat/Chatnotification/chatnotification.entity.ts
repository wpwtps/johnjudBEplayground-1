import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Chatnoti{
    @ObjectIdColumn()
    id?: string;

    @Column()
    User: string;

    @Column()
    roomid: string;

    @Column()
    NotiDate: Date;

    @Column()
    readAt: Date;
}

export default Chatnoti;