import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateRankDto {
    
    @ApiProperty({example: 'Сержант', description: 'Звание'})
    @IsString({message: "Должно быть строкой"})
    readonly value: string;
}
