import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNumber} from "class-validator";

export class CreateTourDto {

    @ApiProperty({ example: 'Exciting Tour', description: 'Название тура' })
    @IsString({message: "Должно быть строкой"})
    readonly name: string;

    @ApiProperty({ example:'A thrilling and exciting tour', description:'Описание тура'})
    @IsString({message: "Должно быть строкой"})
    readonly description: string;

    @ApiProperty({example:'500.00',description:'Цена тура'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly price: number;

    @ApiProperty({example:'750.00',description:'Цена тура премиум версии'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly priceVIP: number;    
}
