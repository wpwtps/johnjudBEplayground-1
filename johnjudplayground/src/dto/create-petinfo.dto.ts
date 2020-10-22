import {IsDate, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString} from 'class-validator'
import { ObjectID, ObjectId } from 'mongodb';
export class CreatePetDto{
    
    @IsNotEmpty()
    PetName: string;

    @IsNotEmpty()
    PetBreed: string;

    @IsNotEmpty()
    PetGender: string;

    type: string;

    petPicUrl: string;

    regPetStatus: string;

    adopPetStatus: string;

    PetStatus: string;

    //petSize: .....

    petLength: string;

    petHeight: string;

    
    //petCerUrl: string;

    //@IsDate
    //TimeStampUpdate: Date;

    UserId: ObjectID;

    AdopUserId: string;
}