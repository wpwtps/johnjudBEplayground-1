import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

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
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
