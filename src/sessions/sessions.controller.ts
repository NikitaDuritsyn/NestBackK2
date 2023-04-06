import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './sessions.model';
import { SessionsService } from './sessions.service';
import { UpdateSessionDto } from './dto/update-session.dto';

@ApiTags('Сессии')
@Controller('/api')
export class SessionsController {
    constructor(private sessionsServices: SessionsService) { }

    @ApiOperation({ summary: 'Создание сессии' })
    @ApiResponse({ status: 200, type: Session })
    @Post('/create_session')
    createSession(@Body() sessionDto: CreateSessionDto) {
        return this.sessionsServices.createSession(sessionDto)
    }

    @ApiOperation({ summary: 'Получить все сессии' })
    @ApiResponse({ status: 200, type: [Session] })
    @Get('/get_sessions')
    getAllSessions() {
        return this.sessionsServices.getAllSessions()
    }

    @ApiOperation({ summary: 'Получить все сессии между дапазоном в N дней (-2..0...N)' })
    @ApiResponse({ status: 200, type: [Session] })
    @Get('/get_sessions/:days')
    getSessionsByDays(@Param('days') days: number) {
        return this.sessionsServices.getSessionsByDays(days)
    }

    @ApiOperation({ summary: 'Получить сессию по её id' })
    @ApiResponse({ status: 200, type: Session })
    @Get('/get_session/:id')
    getSessionById(@Param('id') id: number) {
        return this.sessionsServices.getSessionById(id)
    }

    @ApiOperation({ summary: 'Удалить сессию по её id' })
    @ApiResponse({ status: 200, type: Session })
    @Delete('/delete_session/:id')
    deleteSession(@Param('id') id: number) {
        return this.sessionsServices.deleteSessionById(id)
    }

    @ApiOperation({ summary: 'Обновить время начала сессии' })
    @ApiResponse({ status: 200, type: Session })
    @Get('/update_start_time_session/:id')
    updateSessionStartTime(@Param('id') id: number) {
        return this.sessionsServices.updateSessionStartTime(id)
    }

    @ApiOperation({ summary: 'Обновить время конца сессии' })
    @ApiResponse({ status: 200, type: Session })
    @Get('/update_end_time_session/:id')
    updateSessionEndTime(@Param('id') id: number) {
        return this.sessionsServices.updateSessionEndTime(id)
    }
}