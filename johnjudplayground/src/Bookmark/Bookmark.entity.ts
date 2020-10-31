import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Bookmark{
    @ObjectIdColumn()
    id?: string;
    
    @Column()
    PetId: string;

    @Column()
    PetName: string;

    @Column()
    petPicUrl: string;

    @Column()
    UserIdBookmark: string;
}

export default Bookmark;