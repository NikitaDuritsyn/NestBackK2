import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateVisitorDto {
    @ApiProperty({ example: 1, description: 'Visitor Session' })
    session_id: number

    @ApiProperty({ example: 1, description: 'Visitor tariff' })
    tariff_id: number

    @ApiProperty({ example: 'Nikita', description: 'Имя посетителя' })
    name: string

    @ApiProperty({ example: 'booked', description: 'Статус посетителя (booked/active/close/disactive)' })
    status: string
}