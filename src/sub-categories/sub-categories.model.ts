import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { Product } from "src/product/products.model";

interface SubCategoryCreationAttrs {
    title: string;
}

@Table({ tableName: 'sub_categories' })
export class SubCategory extends Model<SubCategory, SubCategoryCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Посуда', description: 'Название категории' })
    @Column({ type: DataType.TEXT })
    title: string;

    @ApiProperty({ example: 1, description: 'Ссылка на id услуги' })
    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
    category_id: number;

    @HasMany(() => Product)
    Product: Product
    forEach: any;
}