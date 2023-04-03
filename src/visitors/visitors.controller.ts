import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { Visitor } from './visitor.model';
import { VisitorsService } from './visitors.service';

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

    @ApiOperation({ summary: 'Получить всех посетителей' })
    @ApiResponse({ status: 200, type: [Visitor] })
    @Get('/get_visitors/:sessionId')
    getVisitorsBySession(@Param('sessionId') sessionId: number) {
        return this.visitorsService.getVisitorsBySession(sessionId)
    }
}
