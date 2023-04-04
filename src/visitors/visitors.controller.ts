import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { Visitor } from './visitor.model';
import { VisitorsService } from './visitors.service';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { UpdateStartTimeDto } from './dto/update-startTime.dto';
import { UpdateEndTimeDto } from './dto/update-endTime.dto';

@ApiTags('Посетители')
@Controller('/api')
export class VisitorsController {
    constructor(private visitorsService: VisitorsService) { }

    @ApiOperation({ summary: 'Создание посетителя' })
    @ApiResponse({ status: 200, type: Visitor })
    @Post('/create_visitor')
    create(@Body() VisitorDto: CreateVisitorDto) {
        return this.visitorsService.createVisitor(VisitorDto)
    }

    @ApiOperation({ summary: 'Получить всех посетителей' })
    @ApiResponse({ status: 200, type: [Visitor] })
    @Get('/get_visitors')
    getAllVisitors() {
        return this.visitorsService.getAllVisitors()
    }

    @ApiOperation({ summary: 'Получить всех посетителей сессии' })
    @ApiResponse({ status: 200, type: [Visitor] })
    @Get('/get_visitors/:sessionId')
    getVisitorsBySession(@Param('sessionId') sessionId: number) {
        return this.visitorsService.getVisitorsBySession(sessionId)
    }

    @ApiOperation({ summary: 'Обновление пользователя' })
    @ApiResponse({ status: 200, type: Visitor })
    @Post('/update_visitor')
    updateVisitor(@Body() VisitorDto: UpdateVisitorDto) {
        return this.visitorsService.updateVisitor(VisitorDto)
    }

    @ApiOperation({ summary: 'Обновление старта времени для пользователя в сессии' })
    @ApiResponse({ status: 200, type: Visitor })
    @Post('/start_time')
    startTimeUpdateByVisitorsId(@Body() UpdateStartTimeDto: UpdateStartTimeDto) {
        return this.visitorsService.updateStartTimeByVisitorsId(UpdateStartTimeDto)
    }

    @ApiOperation({ summary: 'Обновление конца времени для пользователя в сессии' })
    @ApiResponse({ status: 200, type: Visitor })
    @Post('/end_time')
    endTimeUpdateByVisitorsId(@Body() UpdateEndTimeDto: UpdateEndTimeDto) {
        return this.visitorsService.updateEndTimeByVisitorsId(UpdateEndTimeDto)
    }
}
