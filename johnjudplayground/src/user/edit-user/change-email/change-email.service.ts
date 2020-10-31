import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ChangeEmailInput } from './change-email.input';

@Injectable()
export class ChangeEmailService {
    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>,
    ){}

    async changeEmail(
        ChangeEmailInput: ChangeEmailInput,
        user: User,
    ): Promise<object>{
        const {Email} = ChangeEmailInput;

        const found = await this.UserRepository.findOne({where: {Email, VerifyPhone: true}});

        if(found && found.VerifyPhone){
            throw new ConflictException('Email already exists!!!');
        }

        user.Email = Email;
        await this.UserRepository.save(user);

        return {"success": true};
    }
}
