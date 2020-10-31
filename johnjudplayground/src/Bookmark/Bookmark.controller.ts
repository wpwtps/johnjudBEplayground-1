import {Body, Controller ,Delete,Get, Param, Post} from '@nestjs/common';
import { BookmarkService} from './Bookmark.service';
import { ObjectId, ObjectID } from 'mongodb';
import { Bookmark } from './Bookmark.entity';
import { petInfoService } from 'src/petInfo/petInfo.service';
import { CreateBookmarkDto } from './create-bookmark.dto';

@Controller('bookmark')
export class BookmarkController{
    constructor(private BookmarkService: BookmarkService){}

    @Get()
    async findAll(): Promise<Bookmark[]>{
        return this.BookmarkService.findAll()
    }

    @Get(':UserId')
    async findBookmark(@Param('UserId') UserId: string): Promise<Bookmark[]>{
        return this.BookmarkService.findBookmark(UserId);
    }

    @Post(':UserId/addfav')
    async createBookmark(@Param('UserId') UserId: string,
                         @Body() CreateBookmarkDto: CreateBookmarkDto){
        CreateBookmarkDto.UserIdBookmark = UserId;
        return this.BookmarkService.createBookmark(CreateBookmarkDto);
    }
}