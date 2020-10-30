import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';
import { petinfo } from './petInfo/petInfo.entity'; 
import { noti } from './notification/notification.entity'

import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';
import { petInfoModule } from './petInfo/petInfo.module'
import { notiModule } from './notification/notification.module'
import {filterModule} from './filter/filter.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      
      /*
      type: 'mongodb',  
      host: 'localhost',
      database: 'JJdatabase',
      entities: [ User, petinfo, noti],
      synchronize: true,
      */
      
      
      type: 'mongodb',
      url: 'mongodb+srv://worker:LpHNPZwDA4a36EH@cluster0.4yw9h.azure.mongodb.net/play?retryWrites=true&w=majority',
      useNewUrlParser: true,
      synchronize: true,
      logging: true,
      entities: [User, petinfo, noti]
      

    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UserModule,
    SignupModule,
    AuthModule,
    petInfoModule,
    notiModule,
    filterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
