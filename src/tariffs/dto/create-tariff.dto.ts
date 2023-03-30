import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateTariffDto {
    @ApiProperty({ example: 'По минутам', description: 'Название тарифа' })
    title: string;

    @ApiProperty({ example: 'TimeBased', description: 'Метрики (TimeBased/Fixed)' })
    metric: string;

    @ApiProperty({ example: 500, description: 'Цена за все время' })
    cost: number;
}