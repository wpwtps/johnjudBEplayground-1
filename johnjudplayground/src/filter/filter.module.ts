  
import { Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import { petinfo } from 'src/petInfo/petInfo.entity';
import { filterController } from './filter.controller';
import { filterService } from './filter.service';

@Module({
    imports: [TypeOrmModule.forFeature([petinfo])],
    controllers: [filterController],
    providers: [filterService],
})

export class filterModule {}