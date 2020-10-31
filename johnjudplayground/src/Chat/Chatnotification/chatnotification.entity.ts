import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Chatnoti{
    @ObjectIdColumn()
    id?: string;

    @Column()
    User: string;

    @Column()
    senderid: string;

    @Column()
    sender: string;

    @Column()
    NotiDate: Date;

    @Column()
    isread : boolean;
}

export default Chatnoti;