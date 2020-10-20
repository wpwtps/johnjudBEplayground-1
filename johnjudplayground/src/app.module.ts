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
      type: 'mongodb',
      host: 'localhost',
      database: 'JJdatabase',
      entities: [ User, petinfo],
      synchronize: true,
      /*
      type: 'mongodb',
      url: 'mongodb://localhost/JJdatabase',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        User, petinfo
      ]
      */

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
