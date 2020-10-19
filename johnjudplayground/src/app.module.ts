import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/johnjud',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        User,
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UserModule,
    SignupModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
