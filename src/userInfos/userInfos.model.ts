import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
// import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";
// import {Tour} from "../tours/tours.model";

interface UserInfoCreationAttrs {
    userId: number;
    firstName: string;
    lastName: string;
    birthDay: Date;
    passport: string;
    phone: string;
}

@Table({tableName: 'userInfos'})
export class UserInfo extends Model<UserInfo, UserInfoCreationAttrs> {

    @ApiProperty({ description: 'Уникальный идентификатор' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ description: 'Идентификатор пользователя' })
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    
    @BelongsTo(() => User)
    user: User;

    @ApiProperty({example: 'Иван', description: 'Имя'})
    @Column({type: DataType.STRING})
    firstName: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})
    @Column({type: DataType.STRING})
    lastName: string;

    @ApiProperty({example: '2001-01-20', description: 'Дата рождения'})
    @Column({type: DataType.DATEONLY})
    birthDay: Date;

    @ApiProperty({example: 'MP123456', description: 'Номер паспорта'})
    @Column({type: DataType.STRING})
    passport: string;

    @ApiProperty({example: '+375291234567', description: 'Номер телефона'})
    @Column({type: DataType.STRING})
    phone: string;
}

