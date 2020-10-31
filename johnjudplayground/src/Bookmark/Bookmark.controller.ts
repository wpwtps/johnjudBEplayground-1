import {Body, Controller ,Delete,Get, Param, Post, UseGuards} from '@nestjs/common';
import { BookmarkService} from './Bookmark.service';
import { ObjectId, ObjectID } from 'mongodb';
import { AuthGuard } from "@nestjs/passport";
import { bookmark } from './Bookmark.entity';
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { petInfoService } from 'src/petInfo/petInfo.service';
import { bookmarkinput} from './bookmark.input';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('bookmark')
export class BookmarkController{
    constructor(private BookmarkService: BookmarkService){}

    @Get()
    async findAll(): Promise<bookmark[]>{
        return this.BookmarkService.findAll()
    }

    @Get('/:UserId')
    @UseGuards(AuthGuard())
    async findBookmark(@Param('UserId') UserId: string): Promise<bookmark[]>{
        return this.BookmarkService.findBookmark(UserId);
    }

    @Post('/:UserId/addfav')
    @UseGuards(AuthGuard())
    createBookmark(
        @Param('UserId') UserId: string,
        @Body() bookmarkinput: bookmarkinput,
        @GetUser() User: User,
        ): Promise<object>{
        return this.BookmarkService.createBookmark(bookmarkinput);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
    return this.BookmarkService.remove(id);
  }
}