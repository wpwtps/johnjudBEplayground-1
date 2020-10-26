import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import {petinfo} from 'src/petInfo/petInfo.entity';

@Entity()
export class User{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    UserName: string;

    @Column()
    Password: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    ProfilePicURL: string;

    @Column()
    Birthday: Date;

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

    //@OneToMany(type => petinfo, petinfo => petinfo.UserId, {eager: true})
    //pets: petinfo[];

    async validatePassword(Password: string): Promise<boolean>{
        const hash = await bcrypt.hash(Password, this.salt);
        return hash === this.Password;
    }
}