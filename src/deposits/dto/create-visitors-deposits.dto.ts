import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Deposit } from "../deposits.model";
import { Visitor } from "src/visitors/visitor.model";

export class createVisitorsDepositsDto {
    @ApiProperty({ example: Visitor, description: 'id и client_id посетителя который платит за всех' })
    payer: Visitor

    @ApiProperty({ example: [Visitor], description: '' })
    visitors: Visitor[]

    @ApiProperty({ example: 1, description: 'Deposit client' })
    deposits: Deposit[]
}