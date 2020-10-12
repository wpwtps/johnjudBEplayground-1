import { IsDate, IsDateString, IsEmail, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsPhoneNumber, Length, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto{
    @MinLength(8)
    @MaxLength(20)    
    UserName: string;

    @MinLength(8)
    @MaxLength(20)    
    Password: string;

    @IsNotEmpty()
    FirstName: string;
    
    @IsNotEmpty()    
    LastName: string;

    @IsNotEmpty()   
    ProfilePicURL: string;

    // @IsDateString()
    @IsDate()    
    Birthday: Date;

    @IsNotEmpty()    
    Gender: string;

    @IsPhoneNumber("TH")
    @Length(10)    
    PhoneNo: string;

    @IsEmail()    
    Email: string;

    @IsLatitude()    
    LocationLat: string;

    @IsLongitude()    
    LocationLong: string;

    @Max(5)
    @Min(0)
    @IsNumber()    
    AvgPoint: Number;
        
    Description: string;

    // @IsDateString()
    @IsDate()    
    TimeUpdate: Date;
}