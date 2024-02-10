import {BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Rank} from "../ranks/ranks.model";
import { Violation } from "src/violations/violations.model";

interface OfficerCreationAttrs {
    userId: number;
    rankId: number;
}

@Table({tableName: 'officers'})
export class Officer extends Model<Officer, OfficerCreationAttrs> {

    @ApiProperty({ description: 'Уникальный идентификатор' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ description: 'Идентификатор звания' })
    @ForeignKey(() => Rank)
    @Column({type: DataType.INTEGER})
    rankId: number;
    
    @BelongsTo(() => Rank)
    rank: Rank;

    @ApiProperty({ description: 'Идентификатор пользователя' })
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    
    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Violation)
    violations: Violation[];
}