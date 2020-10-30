import { Module } from '@nestjs/common';
import { V2Controller } from './v2.controller';
import { V2Service } from './v2.service';
import { RegisterModule } from './register/register.module';

@Module({
  controllers: [V2Controller],
  providers: [V2Service],
  imports: [RegisterModule]
})
export class V2Module {}
