import { Module } from '@nestjs/common';
import { LoginInfoService } from './logininfo.service';
import { LogininfoController } from './logininfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User])
  ],
  providers: [LoginInfoService],
  controllers: [LogininfoController]
})
export class LogininfoModule {}
