import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNumber} from "class-validator";

export class CreateRecordDto {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор тура'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly tourId: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;

    @ApiProperty({example: '2024-01-17', description: 'Дата начала'})
    @IsDateString({}, {message: "Должно быть датой"})
    readonly startDate: Date;

    @ApiProperty({example: '7', description: 'Количество дней'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly numberOfDays: number;
}

