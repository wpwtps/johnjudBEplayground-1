import { Module } from '@nestjs/common';
import { LogininfoService } from './logininfo.service';
import { LogininfoController } from './logininfo.controller';

@Module({
  providers: [LogininfoService],
  controllers: [LogininfoController]
})
export class LogininfoModule {}
