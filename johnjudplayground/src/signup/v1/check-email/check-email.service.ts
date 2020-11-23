import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateEmailUserInput } from './create-email-user.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CheckEmailService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    async CreateEmailUser(CreateEmailUserInput: CreateEmailUserInput): Promise<object>{
        const {UserName, Password, FirstName, LastName, ProfilePicURL, Birthday, Gender, PhoneNo, Email, LocationLat, LocationLong, AvgPoint, Description, TimeUpdate} = CreateEmailUserInput;

        const found = await this.userRepository.findOne({where: {Email}});
        // 
        
        // const isVerify = found.VerifyPhone;
        // 
        
        if(found && found.VerifyPhone){
            throw new ConflictException('Email already exists!!!');
        }

        const user = this.userRepository.create({
            id: uuid(),
            Email,
        });

        await this.userRepository.save(user);

        const id = user.id

        return {"success":true, id};
    }
}
