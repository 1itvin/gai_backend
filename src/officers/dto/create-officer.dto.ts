import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class CreateOfficerDto {    

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор звания'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly rankId: number;
}

