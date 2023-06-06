import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateProductDto {
    @ApiProperty({ example: 'Кружка осбенная', description: 'Навзвание подкатегории' })
    title: string;

    @ApiProperty({ example: 1, description: 'Ссылка на категорию' })
    sub_category_id: number;

    @ApiProperty({ example: 10, description: 'Количество товара/имущества на складе' })
    quantity: number;

    @ApiProperty({ example: 2000, description: 'Цена за закупку' })
    purchase_price: number;

    @ApiProperty({ example: new Date, description: 'Годен до', default: 'нет' })
    best_before_date: Date;

    @ApiProperty({ example: 1, description: 'Дата закупки' })
    date: Date;
}