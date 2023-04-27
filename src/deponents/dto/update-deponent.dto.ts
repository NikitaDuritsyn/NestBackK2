
import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class UpdateDeponentDto {

    @ApiProperty({ example: 1, description: 'Deponent id' })
    id: number
    @ApiProperty({ example: 1, description: 'Deponent visitor' })
    visitor_id: number
    @ApiProperty({ example: 1, description: 'Deponent client' })
    client_id: number
    @ApiProperty({ example: 500, description: 'Deponent value' })
    value: number
    @ApiProperty({ example: 500, description: 'Deponent payment_type' })
    payment_type_id: number
    @ApiProperty({ example: 500, description: 'Deponent status (active/disactive)' })
    status: string

}