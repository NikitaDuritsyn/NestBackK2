import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Deponent } from './deponents.model';
import { DeponentsService } from './deponents.service';
import { CreateDeponentDto } from './dto/create-deponent.dto';

@ApiTags('Депоненты')
@Controller('/api')
export class DeponentsController {
    constructor(private deponentsService: DeponentsService) { }

    @ApiOperation({ summary: 'Создание депонент' })
    @ApiResponse({ status: 200, type: Deponent })
    @Post('/create_deponent')
    createDeponent(@Body() deponentDto: CreateDeponentDto) {
        return this.deponentsService.createDeponent(deponentDto)
    }

    @ApiOperation({ summary: 'Получить все депоненты' })
    @ApiResponse({ status: 200, type: Deponent })
    @Get('/deponents')
    getAllDeponents() {
        return this.deponentsService.getAllDeponents()
    }

    @ApiOperation({ summary: 'Получить все депоненты по VisitrosId' })
    @ApiResponse({ status: 200, type: Deponent })
    @Post('/visitors_deponents')
    getDeponentsByVisitorsId(@Body() visitorsId: []) {
        return this.deponentsService.getDeponentsByVisitorsId(visitorsId)
    }
}
