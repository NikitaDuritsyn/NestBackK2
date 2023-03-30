import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateServiceDto {
    @ApiProperty({ example: 'Кальян', description: 'Название услуги' })
    title: string;

    @ApiProperty({ example: 700, description: 'Цена за услугу' })
    price: number;
}