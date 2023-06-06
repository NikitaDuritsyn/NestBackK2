import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class createSubCategoryDto {
    @ApiProperty({ example: 'Кружки', description: 'Навзвание подкатегории' })
    title: string;

    @ApiProperty({ example: 1, description: 'Ссылка на категорию' })
    category_id: number;
}