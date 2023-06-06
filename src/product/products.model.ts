import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { SubCategory } from "src/sub-categories/sub-categories.model";

interface ProductCreationAttrs {
    title: string;
    quantity: number;
    purchase_price: number;
    date: Date;
    sub_category_id: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Ссылка на id услуги' })
    @ForeignKey(() => SubCategory)
    @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
    sub_category_id: number;

    @ApiProperty({ example: 'Чашка', description: 'Название товара' })
    @Column({ type: DataType.TEXT })
    title: string;

    @ApiProperty({ example: 10, description: 'Количество на складе' })
    @Column({ type: DataType.INTEGER })
    quantity: number;

    @ApiProperty({ example: 200, description: 'Цена закупки' })
    @Column({ type: DataType.INTEGER })
    purchase_price: number;

    @ApiProperty({ example: new Date, description: 'Дата закупки', default: 'нет' })
    @Column({ type: DataType.DATE })
    best_before_date: Date;


    @ApiProperty({ example: new Date, description: 'Дата закупки' })
    @Column({ type: DataType.DATE })
    date: Date;
}