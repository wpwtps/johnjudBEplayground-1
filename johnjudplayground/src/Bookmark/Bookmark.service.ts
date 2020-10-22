import { Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ObjectID, ObjectId} from 'mongodb';

import Petinfo from 'src/Pets_profile/PetInfo.entity';
import { Bookmark } from './Bookmark.entity';
import { CreateBookmarkDto } from 'src/dto/create-bookmark.dto';


@Injectable()
export class BookmarkService{
    constructor(
        @InjectRepository(Petinfo)
        private PetinfoRepository: Repository<Petinfo>,
        @InjectRepository(Bookmark)
        private BookmarkRepository: Repository<Bookmark>
    ) {}

    async findAll(): Promise<Bookmark[]>{
        return this.BookmarkRepository.find();
    }

    async findBookmark(UserId:ObjectID): Promise<Bookmark[]>{
        return this.BookmarkRepository.find({where:{UserIdBookmark:UserId}});
    }

    async createBookmark(CreateBookmarkDto: CreateBookmarkDto){
        return this.BookmarkRepository.save(CreateBookmarkDto);
    }
}