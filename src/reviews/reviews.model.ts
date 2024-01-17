import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
// import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";
import {Tour} from "../tours/tours.model";

interface RecordCreationAttrs {
    tourId: number;
    userId: number;
    rating: number;
    review: string;
}

@Table({tableName: 'reviews'})
export class Review extends Model<Review, RecordCreationAttrs> {

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

    @ApiProperty({example: '5', description: 'Рейтинг'})
    @Column({type: DataType.INTEGER})
    rating: number;

    @ApiProperty({example: 'Отличный тур!', description: 'Отзыв'})
    @Column({type: DataType.STRING})
    review: string;
}