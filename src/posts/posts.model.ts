import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({tableName: 'posts'})
export class Posts extends Model<Posts, PostCreationAttrs> {

    @ApiProperty({ description: 'Уникальный идентификатор' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ description: 'Заголовок' })
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({ description: 'Содержание' })
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({ description: 'Изображение' })
    @Column({type: DataType.STRING})
    image: string;

    @ApiProperty({ description: 'Идентификатор пользователя' })
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    
    @BelongsTo(() => User)
    author: User
}