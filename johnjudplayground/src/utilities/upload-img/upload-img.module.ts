import { HttpModule, Module } from '@nestjs/common';
import { UploadImgService } from './upload-img.service';
import { UploadImgController } from './upload-img.controller';

@Module({
  imports:[HttpModule],
  providers: [UploadImgService],
  controllers: [UploadImgController]
})
export class UploadImgModule {}
