import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateDepositDto {
    @ApiProperty({ example: 1, description: 'Deposit visitor' })
    visitor_id: number
    @ApiProperty({ example: 1, description: 'Deposit тип оплаты' })
    paymet_type_id: number
    @ApiProperty({ example: 1, description: 'Deposit client' })
    client_id: number
    @ApiProperty({ example: 1000, description: 'Deposit value' })
    deposit_value: number
}