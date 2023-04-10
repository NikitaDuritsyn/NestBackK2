import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateSomeVisitorsDto {

    @ApiProperty({ example: 4, description: 'Количество создаваемых пользователей' })
    visitorsNum: number

    @ApiProperty({ example: 2, description: 'id тарифа (обыно сессии)' })
    tariff_id: number

    @ApiProperty({ example: 22, description: 'id сессии' })
    session_id: number
}