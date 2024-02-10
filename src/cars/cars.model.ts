import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  HasMany
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Violation } from "src/violations/violations.model";

interface CarCreationAttrs {
  ownerId: number;
  brand: string;
  model: string;
  plate: string;
}

@Table({ tableName: "cars" })
export class Car extends Model<Car, CarCreationAttrs> {
  @ApiProperty({ description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: "Идентификатор пользователя" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  ownerId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: "BMW", description: "Марка" })
  @Column({ type: DataType.STRING })
  brand: string;

  @ApiProperty({ example: "M5 F90", description: "Модель" })
  @Column({ type: DataType.STRING })
  model: string;

  @ApiProperty({ example: "1234XX1", description: "Номерной знак" })
  @Column({ type: DataType.STRING, unique: true })
  plate: string;

  @HasMany(() => Violation)
  violations: Violation[];
}
