import { Module } from '@nestjs/common';
import { V2Controller } from './v2.controller';
import { V2Service } from './v2.service';

@Module({
  controllers: [V2Controller],
  providers: [V2Service]
})
export class V2Module {}
