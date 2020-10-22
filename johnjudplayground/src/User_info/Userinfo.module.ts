import { Module} from '@nestjs/common';
import {UserinfoService} from './Userinfo.service';
import {UserinfoController} from './Userinfo.controller'
import {TypeOrmModule} from '@nestjs/typeorm';
import Userinfo from './Userinfo.entity'
import Petinfo from 'src/Pets_profile/PetInfo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Userinfo ,Petinfo])],
    controllers: [UserinfoController],
    providers: [UserinfoService],
    exports: [UserinfoService],
})

export class UserinfoModule {}