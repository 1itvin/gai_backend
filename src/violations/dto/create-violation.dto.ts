import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString, IsBoolean, Max } from "class-validator";

export class CreateViolationDto {
  @ApiProperty({ example: "1", description: "Идентификатор нарушителя" })
  @IsNumber({}, { message: "Должно быть числом" })
  readonly suspectId: number;

  @ApiProperty({ example: "1", description: "Идентификатор сотрудника гаи" })
  @IsNumber({}, { message: "Должно быть числом" })
  readonly officerId: number;

  @ApiProperty({ example: "1", description: "Идентификатор машины" })
  @IsNumber({}, { message: "Должно быть числом" })
  readonly carId: number;

  @ApiProperty({ example: "2001-01-20", description: "Дата нарушения" })
  @IsDateString({}, { message: "Должно быть датой" })
  readonly rulingDate: Date;

  @ApiProperty({ example: "111", description: "Статья" })
  @IsString({ message: "Должно быть строкой" })
  readonly article: string;

  @ApiProperty({ example: "10", description: "Штраф (в базовых)" })
  @IsNumber({}, { message: "Должно быть числом" })
  @Max(999.9, { message: "Не может превышать 999.9" })
  readonly penalty: number;

  @ApiProperty({ example: false, description: "Оплачен ли штраф?" })
  @IsBoolean({ message: "Должно быть булевым значением" })
  readonly isPaided: boolean;
}
