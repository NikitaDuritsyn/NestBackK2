import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';

@ApiTags('Комнаты')
@Controller('/api')
export class RoomsController {

    constructor(private roomsService: RoomsService) { }

    @ApiOperation({ summary: 'Создать комнату' })
    @ApiResponse({ status: 200, type: Room })
    @Post('/create_room')
    createRoom(@Body() RoomDto: CreateRoomDto) {
        return this.roomsService.createRoom(RoomDto)
    }

    @ApiOperation({ summary: 'Получить все комнаты' })
    @ApiResponse({ status: 200, type: [Room] })
    @Get('/get_rooms')
    getRooms() {
        return this.roomsService.getAllRooms()
    }

    @ApiOperation({ summary: 'Удалить комнату' })
    @ApiResponse({ status: 200, type: Room })
    @Delete('/delete_room/:id')
    deleteRoom(@Param('id') id: number) {
        return this.roomsService.deleteRoomById(id)
    }
}
