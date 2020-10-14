import { Injectable } from '@nestjs/common';
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

    async CreateEmailUser(CreateEmailUserInput: CreateEmailUserInput): Promise<User>{
        const {UserName, Password, FirstName, LastName, ProfilePicURL, Birthday, Gender, PhoneNo, Email, LocationLat, LocationLong, AvgPoint, Description, TimeUpdate} = CreateEmailUserInput;

        const user = this.userRepository.create({
            id: uuid(),
            Email,
        });

        return this.userRepository.save(user);
    }
}
