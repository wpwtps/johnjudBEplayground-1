import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn } from 'typeorm'; 
import { Double, ObjectID } from 'mongodb';

@Entity()
export class petinfo{
  /*
    save() {
      throw new Error('Method not implemented.');
    }
    static id(id: any, PetStatus: any): petinfo | PromiseLike<petinfo> {
      throw new Error('Method not implemented.');
    }
    */
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    petid: string;

    @Column()
    PetName: string;

    @Column()
    PetBreed: string;

    @Column()
    PetGender: string;

    @Column()
    PetPicURL: string;

    @Column()
    PetStatus: string;

    @Column()
    PetWeight: Double;

    @Column()
    PetCerURL: string;
}


