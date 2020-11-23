import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImgService } from './upload-img.service';

@Controller('/utilities/upload-img')
export class UploadImgController {
    constructor(
        private uploadImgService: UploadImgService
    ){}

    @Post()
    @UseInterceptors(FileInterceptor('img'))
    uploadImg(@UploadedFile() img){
        // 
        return this.uploadImgService.uploadImg(img);
    }
}
