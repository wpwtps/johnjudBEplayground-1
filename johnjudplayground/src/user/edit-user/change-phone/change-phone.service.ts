import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ChangePhoneInput } from './change-phone.input';

@Injectable()
export class ChangePhoneService {
    constructor(
        @InjectRepository(User) private ChnagePhoneRepository: Repository<User>,
    ){}

    async saveTempPhone(
        ChangePhoneInput: ChangePhoneInput,
        user: User,
    ): Promise<object>{
        const {PhoneNo} = ChangePhoneInput;

        const found = await this.ChnagePhoneRepository.findOne({where: {PhoneNo}});
        if(found && found.VerifyPhone){
            throw new ConflictException('PhoneNO or Account already exisits!!!');
        }

        user.tempPhone = PhoneNo;
        await this.ChnagePhoneRepository.save(user);

        return {"success": true, "PhoneNo": PhoneNo};
    }
}
