import { Transform } from "class-transformer";
import { IsDate, IsInt, isNumber, IsNumber, IsNumberString, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(1)
    login: string;
  
    @IsString()
    @MinLength(1)
    password: string;
}

export class TestDTO {
    @Transform(({value}) => {
        return Number(value)
    })
    @IsNumber()
    latitude: number;

    @Transform(({value}) => {
        return Number(value)
    })
    @IsNumber()
    longitude: number
}