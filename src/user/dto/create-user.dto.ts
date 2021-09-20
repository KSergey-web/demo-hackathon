import { Transform } from "class-transformer";
import { IsDate, IsInt, IsNumber, IsNumberString, IsString, MaxLength, MinLength } from "class-validator";

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
    @IsInt()
    id: number;

    @Transform(({value}) => {
        return new Date(value)
    })
    @IsDate()
    date: Date
}