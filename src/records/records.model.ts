import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
// import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";
import {Tour} from "../tours/tours.model";

interface RecordCreationAttrs {
    tourId: number;
    userId: number;
    startDate: Date;
    numberOfDays: number;
}

@Table({tableName: 'records'})
export class Record extends Model<Record, RecordCreationAttrs> {

    @ApiProperty({ description: 'Уникальный идентификатор' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ description: 'Идентификатор тура' })
    @ForeignKey(() => Tour)
    @Column({type: DataType.INTEGER})
    tourId: number;
    
    @BelongsTo(() => Tour)
    tour: Tour;

    @ApiProperty({ description: 'Идентификатор пользователя' })
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    
    @BelongsTo(() => User)
    visitor: User;

    @ApiProperty({example: '2024-01-17', description: 'Дата начала'})
    @Column({type: DataType.DATEONLY})
    startDate: Date;

    @ApiProperty({ description: 'Количество дней' })
    @Column({type: DataType.INTEGER})
    numberOfDays: number;
}