import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "./jwt-payload.interface";

require('dotenv').config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.KEY}`,
        });
    }

    async validate(payload: JwtPayload){
        const { UserName } = payload;
        const user = await this.userRepository.findOne({UserName, VerifyPhone:true});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}