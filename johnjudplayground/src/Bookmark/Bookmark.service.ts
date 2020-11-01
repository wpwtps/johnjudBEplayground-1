import { Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ObjectID, ObjectId} from 'mongodb';

import { bookmark } from './Bookmark.entity';
import { petinfo } from 'src/petInfo/petInfo.entity';
import { bookmarkinput} from './bookmark.input';


@Injectable()
export class BookmarkService{
    constructor(
        @InjectRepository(bookmark)
        private BookmarkRepository: Repository<bookmark>
    ) {}

    async findAll(): Promise<bookmark[]>{
        return this.BookmarkRepository.find();
    }

    async findBookmark(UserId:string): Promise<bookmark[]>{
        return this.BookmarkRepository.find({where:{UserIdBookmark:UserId}});
    }

    async createBookmark(bookmarkinput: bookmarkinput):Promise<object>{
        const {petid, petPicUrl, UserIdBookmark} = bookmarkinput;
        const newBookmark = this.BookmarkRepository.create();
        newBookmark.petid = petid;
        newBookmark.petPicUrl = petPicUrl;
        newBookmark.UserIdBookmark = UserIdBookmark;
        await this.BookmarkRepository.save(bookmarkinput);
        return newBookmark;
    }

    async remove(id: string): Promise<void> {
        await this.BookmarkRepository.delete(id);
      }
}