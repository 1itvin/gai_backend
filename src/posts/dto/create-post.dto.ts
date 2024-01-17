import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNumber} from "class-validator";

export class CreatePostDto {

    @ApiProperty({example: 'Tittle', description: 'Заголовок'})
    @IsString({message: "Должно быть строкой"})
    readonly title: string;

    @ApiProperty({example: 'Cool', description: 'Описание'})
    @IsString({message: "Должно быть строкой"})
    readonly content: string;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор того, кто оставляет пост'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;
}