import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Bookmark{
    @ObjectIdColumn()
    id?: ObjectID;
    
    @Column()
    PetId: ObjectID;

    @Column()
    PetName: string;

    @Column()
    petPicUrl: string;

    @Column()
    UserIdBookmark: ObjectID;
}

export default Bookmark;