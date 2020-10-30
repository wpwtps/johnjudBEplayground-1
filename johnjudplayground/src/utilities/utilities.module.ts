import { Module } from '@nestjs/common';
import { UploadImgModule } from './upload-img/upload-img.module';

@Module({
  imports: [UploadImgModule]
})
export class UtilitiesModule {}
