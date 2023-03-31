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

    @ApiProperty({ example: { visitor_id: 2, deponent_value: 2, status: 'active', }, description: 'Не обязательное, депоНент посетителя для бронирования' })
    deponent: {
        visitor_id: number;
        deponent_value: number;
        status: string;
    }

    @ApiProperty({ example: { visitor_id: 1, paymet_type_id: 3, client_id: 2, deposit_value: 1000 }, description: 'Не обязательное, депоЗит посетителя для бронирования' })
    deposit: {
        visitor_id: number
        paymet_type_id: number
        client_id: number
        deposit_value: number
    }
}