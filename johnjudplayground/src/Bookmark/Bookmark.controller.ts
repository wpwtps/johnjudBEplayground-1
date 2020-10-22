import {Body, Controller ,Delete,Get, Param, Post} from '@nestjs/common';
import { BookmarkService} from './Bookmark.service';
import { ObjectId, ObjectID } from 'mongodb';
import Petinfo from 'src/Pets_profile/PetInfo.entity';
import { Bookmark } from './Bookmark.entity';
import { ParseObjectIdPipe } from 'src/common/pipe';
import { CreateBookmarkDto } from 'src/dto/create-bookmark.dto';
import { PetinfoService } from 'src/Pets_profile/PetInfo.service';
import { GetPet } from 'src/Pets_profile/get-pet.decorator';

@Controller('bookmark')
export class BookmarkController{
    constructor(private BookmarkService: BookmarkService,
                private PetinfoService: PetinfoService){}

    @Get()
    async findAll(): Promise<Bookmark[]>{
        return this.BookmarkService.findAll()
    }

    @Get(':UserId')
    async findBookmark(@Param('UserId',ParseObjectIdPipe) UserId: ObjectID): Promise<Bookmark[]>{
        return this.BookmarkService.findBookmark(UserId);
    }

    @Post(':UserId/addfav')
    async createBookmark(@Param('UserId',ParseObjectIdPipe) UserId: ObjectID,
                         @Body() CreateBookmarkDto: CreateBookmarkDto){
        CreateBookmarkDto.UserIdBookmark = UserId;
        return this.BookmarkService.createBookmark(CreateBookmarkDto);
    }
}