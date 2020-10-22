import { createParamDecorator } from "@nestjs/common";
import Petinfo from "./PetInfo.entity";

export const GetPet = createParamDecorator(
    (data,req): Petinfo =>{
        const pet = req.args[0].pet;
        return pet;
    }
)