import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { petinfo } from './petInfo/petInfo.entity'; 
import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';
import { petInfoModule } from './petInfo/petInfo.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      /*
      type: 'mongodb',  
      host: 'localhost',
      database: 'JJdatabase',
      entities: [ user, petinfo],
      synchronize: true,
      */
      
      type: 'mongodb',
      url: 'mongodb+srv://worker:LpHNPZwDA4a36EH@cluster0.4yw9h.azure.mongodb.net/aom?retryWrites=true&w=majority',
      // database: 'aom',
      useNewUrlParser: true,
      synchronize: true,
      logging: true,
      entities: [User, petinfo]
      

    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UserModule,
    SignupModule,
    AuthModule,
    petInfoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
