import { Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ObjectID, ObjectId} from 'mongodb';

import { Bookmark } from './Bookmark.entity';
import { petinfo } from 'src/petInfo/petInfo.entity';
import { CreateBookmarkDto } from './create-bookmark.dto';


@Injectable()
export class BookmarkService{
    constructor(
        @InjectRepository(Bookmark)
        private BookmarkRepository: Repository<Bookmark>
    ) {}

    async findAll(): Promise<Bookmark[]>{
        return this.BookmarkRepository.find();
    }

    async findBookmark(UserId:string): Promise<Bookmark[]>{
        return this.BookmarkRepository.find({where:{UserIdBookmark:UserId}});
    }

    async createBookmark(CreateBookmarkDto: CreateBookmarkDto){
        return this.BookmarkRepository.save(CreateBookmarkDto);
    }
}