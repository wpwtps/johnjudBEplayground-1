import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Newroom{
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    bothRoomName: string[];

    @Column()
    bothUserId: ObjectID[];
}

export default Newroom;