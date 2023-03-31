import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateVisitorServiceDto {
    @ApiProperty({ example: 1, description: 'Ссылка на id посетителя' })
    visitor_id: number;
    
    @ApiProperty({ example: 1, description: 'Ссылка на id услуги' })
    service_id: number;
}