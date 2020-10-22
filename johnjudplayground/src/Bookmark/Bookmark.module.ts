import { Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import Petinfo from 'src/Pets_profile/PetInfo.entity';
import { PetinfoModule } from 'src/Pets_profile/PetInfo.module';
import { PetinfoService } from 'src/Pets_profile/PetInfo.service';
import { BookmarkController } from './Bookmark.controller';
import { Bookmark } from './Bookmark.entity';
import { BookmarkService } from './Bookmark.service';


@Module({
    imports: [TypeOrmModule.forFeature([Petinfo,Bookmark]),
        PetinfoModule
    ],

    controllers: [BookmarkController],
    providers: [BookmarkService,PetinfoService],
})

export class BookmarkModule {}