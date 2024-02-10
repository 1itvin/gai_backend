import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNumber,
  IsString,
  IsEmail,
  Max, 
  Min
} from "class-validator";

export class CreateUserInfoDto {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор пользователя",
  })
  @IsNumber({}, { message: "Должно быть числом" })
  readonly userId: number;

  @ApiProperty({ example: 1234567890, description: "Номер прав" })
  @IsNumber({}, { message: "Должно быть числом" })
  @Min(1000000000, { message: "Должно быть не менее 10 цифр" })
  @Max(9999999999, { message: "Должно быть не более 10 цифр" })
readonly license: number;

  @ApiProperty({ example: "Иван", description: "Имя" })
  @IsString({ message: "Должно быть строкой" })
  readonly firstName: string;

  @ApiProperty({ example: "Иванов", description: "Фамилия" })
  @IsString({ message: "Должно быть строкой" })
  readonly lastName: string;

  @ApiProperty({ example: "Иванович", description: "Отчество" })
  @IsString({ message: "Должно быть строкой" })
  readonly middleName: string;

  @ApiProperty({ example: "1990-01-01", description: "Дата рождения" })
  @IsDateString({}, { message: "Должно быть датой" })
  readonly birthDay: Date;

  @ApiProperty({ example: "+375291234567", description: "Номер телефона" })
  @IsString({ message: "Должно быть строкой" })
  readonly phone: string;

  @ApiProperty({ example: "user@gmail.com", description: "Почта" })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;
}
