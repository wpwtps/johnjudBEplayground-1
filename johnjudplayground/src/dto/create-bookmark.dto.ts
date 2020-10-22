import { isNotEmpty, IsNotEmpty } from 'class-validator';
import { ObjectID} from 'mongodb';

export class CreateBookmarkDto{
    
    @IsNotEmpty()
    PetId: ObjectID;

    @IsNotEmpty()
    PetName: string;

    @IsNotEmpty()
    petPicUrl: string;

    UserIdBookmark: ObjectID;
}