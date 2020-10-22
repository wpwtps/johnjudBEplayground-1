import { Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import Petinfo from 'src/Pets_profile/PetInfo.entity';
import { HomePageController } from './HomePage.controller';
import { HomePageService } from './Homepage.service';

@Module({
    imports: [TypeOrmModule.forFeature([Petinfo])],
    controllers: [HomePageController],
    providers: [HomePageService],
})

export class HomePageModule {}