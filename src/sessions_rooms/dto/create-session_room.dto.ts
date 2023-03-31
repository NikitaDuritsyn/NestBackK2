import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionRoomDto {
    @ApiProperty({ example: 1, description: 'Ссылка на id комнаты' })
    room_id: number;
    @ApiProperty({ example: 1, description: 'Ссылка на id сессии' })
    session_id: number;
}