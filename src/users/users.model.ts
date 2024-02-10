import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import { UserInfo } from "src/userInfos/userInfos.model";
import {Officer} from "../officers/officers.model";
import {Car} from "../cars/cars.model";
import { Violation } from "src/violations/violations.model";

interface UserCreationAttrs {
    login: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user', description: 'Логин'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;
    
    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasOne(() => UserInfo)
    userInfo: UserInfo;

    @HasMany(() => Car)
    cars: Car[];

    @HasMany(() => Violation)
    violations: Violation[];

    @HasOne(() => Officer)
    officer: Officer;

}
