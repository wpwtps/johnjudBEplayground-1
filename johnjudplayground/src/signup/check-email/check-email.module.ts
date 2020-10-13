import { Module } from '@nestjs/common';
import { CheckEmailService } from './check-email.service';
import { CheckEmailController } from './check-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User])
  ],
  providers: [CheckEmailService],
  controllers: [CheckEmailController]
})
export class CheckEmailModule {}
