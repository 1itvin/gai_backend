import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsString,
} from "class-validator";

export class CreateCarDto {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор пользователя",
  })
  @IsNumber({}, { message: "Должно быть числом" })
  readonly ownerId: number;

  @ApiProperty({ example: "BMW", description: "Марка" })
  @IsString({ message: "Должно быть строкой" })
  readonly brand: string;

  @ApiProperty({ example: "M5 F90", description: "Модель" })
  @IsString({ message: "Должно быть строкой" })
  readonly model: string;

  @ApiProperty({ example: "1234XX1", description: "Номерной знак" })
  @IsString({ message: "Должно быть строкой" })
  readonly plate: string;
}
