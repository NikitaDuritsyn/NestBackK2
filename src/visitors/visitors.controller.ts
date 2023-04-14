import { Controller, Body, Post, Get, Param, Delete } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { Visitor } from './visitor.model';
import { VisitorsService } from './visitors.service';
import { UpdateVisitorsDto } from './dto/update-visitors.dto';
import { CreateSomeVisitorsDto } from './dto/create-somevisitors.dto';

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

    @ApiOperation({ summary: 'Создание посетителя по id сессии' })
    @ApiResponse({ status: 200, type: Visitor })
    @Post('/create_visitor/:id')
    createVisitorBySession(@Body() VisitorDto: CreateVisitorDto, @Param('id') sessionId: number) {
        return this.visitorsService.createVisitor(VisitorDto, sessionId)
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

    @ApiOperation({ summary: 'Обновление данных нескольких пользователей' })
    @ApiResponse({ status: 200, type: Visitor })
    @Post('/update_visitors')
    updateVisitor(@Body() VisitorsDto: UpdateVisitorsDto) {
        return this.visitorsService.updateVisitors(VisitorsDto)
    }

    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiResponse({ status: 200, type: Visitor })
    @Delete('/delete_visitor/:id')
    deleteVisitorById(@Param('id') visitorId: number) {
        return this.visitorsService.deleteVisitorById(visitorId)
    }

    @ApiOperation({ summary: 'Создать несколько ананимных пользователей' })
    @ApiResponse({ status: 200, type: Number })
    @Post('/create_some_visitors')
    createSomeVisitors(@Body() data: CreateSomeVisitorsDto) {
        return this.visitorsService.createSomeVisitors(data)
    }


    @ApiOperation({ summary: 'Получить все услуги посетителей за все время' })
    @ApiResponse({ status: 200, type: [Visitor] })
    @Post('/visitors_services')
    VisitorsServices(@Body() visitorsId: number[]) {
        return this.visitorsService.getVisitorsServices(visitorsId)
    }

}
