import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreatePaymentTypeDto {
    @ApiProperty({ example: 'Наличая оплата', description: 'Название типа оплаты' })
    title: string;

    @ApiProperty({ example: 'Cash', description: 'Тип оплаты' })
    type: string;
}