import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Car } from "../cars/cars.model";
import { Officer } from "../officers/officers.model";

interface ViolationsCreationAttrs {
  suspectId: number;
  officerId: number;
  carId: number;
  rulingDate: Date;
  article: string;
  penalty: number;
  isPaided: boolean;
}

@Table({ tableName: "violations" })
export class Violation extends Model<Violation, ViolationsCreationAttrs> {
  @ApiProperty({ description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: "Идентификатор нарушителя" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  suspectId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ description: "Идентификатор сотрудника гаи" })
  @ForeignKey(() => Officer)
  @Column({ type: DataType.INTEGER })
  officerId: number;

  @BelongsTo(() => Officer)
  officer: Officer;

  @ApiProperty({ description: "Идентификатор машины" })
  @ForeignKey(() => Car)
  @Column({ type: DataType.INTEGER })
  carId: number;

  @BelongsTo(() => Car)
  car: Car;

  @ApiProperty({ example: "2001-01-20", description: "Дата нарушения" })
  @Column({ type: DataType.DATEONLY })
  rulingDate: Date;

  @ApiProperty({ example: "111", description: "Статья" })
  @Column({ type: DataType.STRING })
  article: string;

  @ApiProperty({ example: "10", description: "Штраф (в базовых)" })
  @Column({ type: DataType.INTEGER })
  penalty: number;

  @ApiProperty({ example: false, description: "Оплачен ли штраф?" })
  @Column({ type: DataType.BOOLEAN})
  isPaided: boolean;
}
