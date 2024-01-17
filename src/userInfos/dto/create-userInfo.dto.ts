import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNumber, IsString} from "class-validator";

export class CreateUserInfoDto {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;

    @ApiProperty({example: 'Иван', description: 'Имя'})
    @IsString({message: "Должно быть строкой"})
    readonly firstName: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})
    @IsString({message: "Должно быть строкой"})
    readonly lastName: string;

    @ApiProperty({example: '1990-01-01', description: 'Дата рождения'})
    @IsDateString({}, {message: "Должно быть датой"})
    readonly birthDay: Date;

    @ApiProperty({example: 'MP123456', description: 'Номер паспорта'})
    @IsString({message: "Должно быть строкой"})
    readonly passport: string;

    @ApiProperty({example: '+375291234567', description: 'Номер телефона'})
    @IsString({message: "Должно быть строкой"})
    readonly phone: string;
}

