import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';


@Entity()
export class bookmark{
    @ObjectIdColumn()
    id?: string;
    
    @Column()
    petid: string;

    @Column()
    petPicUrl: string;

    @Column()
    UserIdBookmark: string;
}
