import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateDepositDto {
    @ApiProperty({ example: 3, description: 'id посетителя' })
    visitor_id: number

    @ApiProperty({ example: 1, description: 'Deposit тип оплаты' })
    payment_type_id: number

    @ApiProperty({ example: 1, description: 'Deposit client' })
    client_id: number

    @ApiProperty({ example: 1000, description: 'Deposit value' })
    value: number
}