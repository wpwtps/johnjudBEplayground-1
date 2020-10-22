import { createParamDecorator } from "@nestjs/common";
import Userinfo from "./Userinfo.entity";


export const GetUser = createParamDecorator(
    (data,req): Userinfo | string =>{
        if(data){
            return req.user[data];
        }
        return req.user;
    },
);