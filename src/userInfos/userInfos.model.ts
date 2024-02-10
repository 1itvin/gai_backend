import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface UserInfoCreationAttrs {
  userId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDay: Date;
  phone: string;
  email: string;
  license: number;
}

@Table({ tableName: "userInfos" })
export class UserInfo extends Model<UserInfo, UserInfoCreationAttrs> {
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
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ description: "Номер прав" })
  @Column({ type: DataType.INTEGER })
  license: number;

  @ApiProperty({ example: "Иван", description: "Имя" })
  @Column({ type: DataType.STRING })
  firstName: string;

  @ApiProperty({ example: "Иванов", description: "Фамилия" })
  @Column({ type: DataType.STRING })
  lastName: string;

  @ApiProperty({ example: "Иванович", description: "Отчество" })
  @Column({ type: DataType.STRING })
  middleName: string;

  @ApiProperty({ example: "2001-01-20", description: "Дата рождения" })
  @Column({ type: DataType.DATEONLY })
  birthDay: Date;

  @ApiProperty({ example: "+375291234567", description: "Номер телефона" })
  @Column({ type: DataType.STRING })
  phone: string;

  @ApiProperty({ example: "user@gmail.com", description: "Почта" })
  @Column({ type: DataType.STRING })
  email: string;
}
