import { Entity, Column, ObjectIdColumn } from 'typeorm'; 
import { Binary, ObjectID } from 'mongodb';

@Entity()
export class noti {
  @ObjectIdColumn()
  _id: ObjectID | string;

  @Column()
  UserID: ObjectID;

  @Column()
  TimeStamp: Date;

  @Column()
  Content: string;

  @Column()
  Type: string;

  @Column()
  ReadNoti: Binary;
  
  //@Column()
  //NotiUnreadCount: number;
  
}

