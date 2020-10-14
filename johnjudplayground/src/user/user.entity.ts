import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

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
}