import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table, HasMany,} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Record} from "../records/records.model";
import {Review} from "../reviews/reviews.model";

interface TourCreationAttrs {
    name: string;
    description: string;
    price: number;
    priceVIP: number;
    image: string;
}

@Table({ tableName: 'tours' })
export class Tour extends Model<Tour, TourCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Exciting Tour', description: 'Название тура' })
    @Column({ type: DataType.STRING(100), allowNull:false})
    name:string;

    @ApiProperty({ example:'A thrilling and exciting tour', description:'Описание тура'})
    @Column({type :DataType.TEXT})
    description:string;
    
  	@ApiProperty({example:'500.00',description:'Цена тура'})
  	@Column ({type :DataType.DECIMAL(10,2)})
  	price:number;

    @ApiProperty({example:'750.00',description:'Цена тура премиум версии'})
  	@Column ({type :DataType.DECIMAL(10,2)})
  	priceVIP:number;

    @ApiProperty({example:'tour1.png',description:'Картинка'})
    @Column({type: DataType.STRING})
    image: string;

    @HasMany(() => Review)
    reviews: Review[];

    @HasMany(() => Record)
    records: Record[];
}
