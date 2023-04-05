import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { UpdateVisitorDto } from "./update-visitor.dto";

export class UpdateVisitorsDto {
    @ApiProperty({ example: UpdateVisitorDto, description: 'данные которые нужно обновить у пользователей' })
    visitorUpdateData: UpdateVisitorDto;

    @ApiProperty({ example: [1, 2, 3, 4, 5], description: 'id пользователей данные которые нужно обновить' })
    visitorsId: [number];
}