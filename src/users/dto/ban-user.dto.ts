import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
    
    @ApiProperty({example: 'Флуд', description: 'Причина'})
    @IsString({message: "Должно быть строкой"})
    readonly banReason: string;
}
