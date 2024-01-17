import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNumber, Length, IsInt, Min, Max} from "class-validator";

export class CreateReviewDto {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор тура'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly tourId: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;

    @ApiProperty({example: '5', description: 'Рейтинг'})
    @IsInt({message: "Должно быть целым числом"})
    @Min(1, {message: "Должно быть не меньше 1"})
    @Max(5, {message: "Должно быть не больше 5"})
    readonly rating: number;


    @ApiProperty({example: 'Отличный тур!', description: 'Отзыв'})
    @IsString({message: "Должно быть строкой"})
    readonly review: string;
}

