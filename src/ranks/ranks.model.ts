import {Column, DataType, Model, Table, HasOne} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Officer} from "../officers/officers.model";

interface RankCreationAttrs {
    value: string;
}

@Table({tableName: 'ranks'})
export class Rank extends Model<Rank, RankCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Сержант', description: 'Уникальное Значение звания '})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @HasOne(() => Officer)
    officer: Officer;
}
