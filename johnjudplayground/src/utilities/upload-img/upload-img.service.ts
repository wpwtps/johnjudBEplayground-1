import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class UploadImgService {
    constructor(private httpService: HttpService){}

    async uploadImg(
        Img
    ){
        // var axios = require('axios');
        // var FormData = require('form-data');
        // var fs = require('fs');
        // var data = new FormData();
        // data.append('image', fs.createReadStream('/address/image.jpg'));

        // var config = {
        // method: 'post',
        // url: 'https://api.imgbb.com/1/upload?key=6a6fdcf54607966c3d037f0db246f7c1',
        // headers: { 
        //     ...data.getHeaders()
        // },
        // data : data
        // };

        // axios(config)
        // .then(function (response) {
        // 
        // })
        // .catch(function (error) {
        // 
        // });                
    }
}
