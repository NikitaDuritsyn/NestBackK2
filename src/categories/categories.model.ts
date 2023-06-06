import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { SubCategory } from "src/sub-categories/sub-categories.model";

interface CategoryCreationAttrs {
    title: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Посуда', description: 'Название категории' })
    @Column({ type: DataType.TEXT })
    title: string;

    @HasMany(() => SubCategory)
    SubCategory: SubCategory
}