import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class createCategoryDto {
    @ApiProperty({ example: 'Пасуда', description: 'Навзвание категории' })
    title: string;
}