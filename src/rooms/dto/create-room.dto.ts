import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateRoomDto {
    @ApiProperty({ example: 'Окно в небо 1', description: 'Название комнаты' })
    readonly title: string;
}