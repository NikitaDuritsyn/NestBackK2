import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateDepositVisitorData {
    @ApiProperty({ example: 3, description: 'id посетителя' })
    visitor_id: number

    @ApiProperty({ example: 1, description: 'Deposit client' })
    client_id: number
}