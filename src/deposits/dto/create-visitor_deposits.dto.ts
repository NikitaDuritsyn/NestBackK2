import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { CreateDepositDto } from "./create-deposit.dto";

export class CreateVisitorDepositsDto {
    @ApiProperty({ example: [{ payment_type_id: 1, value: 200, vsiitor_id: 1, client_id: 1 }], description: 'Данные пользователя' })
    deposits: CreateDepositDto[]
}