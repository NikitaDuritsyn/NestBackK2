
import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateDeponentDto {
    @ApiProperty({ example: 1, description: 'Deponent visitor' })
    visitor_id: number
    @ApiProperty({ example: 500, description: 'Deponent value' })
    deponent_value: number
    @ApiProperty({ example: 500, description: 'Deponent status (active/disactive)' })
    status: string
}