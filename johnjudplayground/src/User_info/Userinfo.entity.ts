import { Column, Entity, ObjectIdColumn, PrimaryColumn, } from "typeorm";
import * as bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer'
import { ObjectID } from "mongodb";

@Entity()
export class Userinfo{
    @ObjectIdColumn()
    id?: ObjectID;

    // @PrimaryColumn()
    // id: ObjectID;

    @Column()
    UserName: string;

    @Column()
    @Exclude()
    Password: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    ProfilePicURL: string;

    @Column()
    Birthday: string;

    @Column()
    Gender: string;

    @Column()
    PhoneNo: string;

    @Column()
    Email: string;

    @Column()
    LocationLat: string;

    @Column()
    LocationLong: string;

    @Column()
    Facebook: string;

    @Column()
    Address: string;   

    @Column()
    AvgPoint: Number;

    @Column()
    Description: string;

    @Column()
    TimeUpdate: Date;

    @Column()
    VerifyPhone: Boolean;

    @Column()
    tempOTP: number;

    @Column()
    VerifyEmail: Boolean;

    @Column()
    salt: string;

    async validatePassword(Password: string): Promise<boolean>{
        const hash = await bcrypt.hash(Password, this.salt);
        return hash === this.Password;
    }
}

export default Userinfo;