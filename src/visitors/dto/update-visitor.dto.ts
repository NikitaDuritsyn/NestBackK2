import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class UpdateVisitorDto {
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    id: number;

    @ApiProperty({ example: 1, description: 'Visitor Session' })
    session_id: number;

    @ApiProperty({ example: 1, description: 'Visitor tariff' })
    tariff_id: number;

    @ApiProperty({ example: 1, description: 'Если есть номер то есть ссылка на клиента' })
    client_id: number;

    @ApiProperty({ example: new Date, description: 'Время начала старта сессии для посетителя' })
    start_time_visitor: Date;

    @ApiProperty({ example: new Date, description: 'Время конца старта сессии для посетителя' })
    end_time_visitor: Date;

    @ApiProperty({ example: 'Nikita', description: 'Имя посетителя' })
    name: string;

    @ApiProperty({ example: 'booked', description: 'Статус посетителя (booked/active/close/disactive)' })
    status: string;
}