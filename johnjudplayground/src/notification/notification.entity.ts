import { Entity, Column, ObjectIdColumn, PrimaryColumn } from 'typeorm'; 
//import { Binary, ObjectID } from 'mongodb';

@Entity()
export class noti {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  notiid: string;

  @Column()
  DonUserID: string;

  @Column()
  TimeStampUpdate: Date;

  //@Column()
  //Content: string;

  @Column()
  RequestPet: string;

  @Column()
  RecUserID: string;

  @Column()
  petid: string;

  //@Column()
  //ReadNoti: Binary;
  
  //@Column()
  //NotiUnreadCount: number;
  
}

