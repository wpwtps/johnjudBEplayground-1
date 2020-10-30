import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ChangePasswordInput } from './change-password.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangePasswordService {
    constructor(
        @InjectRepository(User) private ChangePasswordRepository: Repository<User>,
    ){}

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }

    async changePass(
        ChangePasswordInput: ChangePasswordInput,
        user: User,
    ): Promise<object>{
        const {Password, ConfirmPassword} = ChangePasswordInput;
        const id = user.id;
        const UserName = user.UserName;

        //check if Password matches ConfirmPassword
        if(Password!==ConfirmPassword){
            throw new ConflictException('Passwords do not match!!!');
        }

        user.salt = await bcrypt.genSalt();
        user.Password = await this.hashPassword(Password, user.salt);

        await this.ChangePasswordRepository.save(user)

        return {"success": true};
    }
}
