import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SessionsRoomsService } from './sessions_rooms.service';
import { SessionRoom } from './sessions_rooms.model';
import { CreateSessionRoomDto } from './dto/create-session_room.dto';

@ApiTags('Комнаты сессии')
@Controller('/api')
export class SessionsRoomsController {
    constructor(private sessionsRoomsService: SessionsRoomsService) { }

    @ApiOperation({ summary: 'Задать комнаты для сессии' })
    @ApiResponse({ status: 200, type: SessionRoom })
    @Post('/create_session_room')
    createSessionRoom(@Body() sessionRoomDto: CreateSessionRoomDto) {
        return this.sessionsRoomsService.createSessionRoom(sessionRoomDto)
    }

    
    @ApiOperation({ summary: 'Получить использование комнат за все время' })
    @ApiResponse({ status: 200, type: [SessionRoom] })
    @Get('/sessions_rooms')
    getAllSessionsRooms() {
        return this.sessionsRoomsService.getAllSessionsRooms()
    }
}
