import { Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { petinfo } from 'src/petInfo/petInfo.entity';
import { petInfoModule } from 'src/petInfo/petInfo.module';
import { petInfoService } from 'src/petInfo/petInfo.service';
import { User } from 'src/user/user.entity';
import { BookmarkController } from './Bookmark.controller';
import { bookmark } from './Bookmark.entity';
import { BookmarkService } from './Bookmark.service';


@Module({
    imports: [TypeOrmModule.forFeature([petinfo,bookmark,User]),
        petInfoModule,AuthModule
    ],

    controllers: [BookmarkController],
    providers: [BookmarkService,petInfoService],
})

export class BookmarkModule {}