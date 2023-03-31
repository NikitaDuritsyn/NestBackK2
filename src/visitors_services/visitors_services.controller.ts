import { Body, Controller, Get, Post } from '@nestjs/common';
import { VisitorsServicesService } from './visitors_services.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVisitorServiceDto } from './dto/create-visitor_service.dto';
import { VisitorService } from './visitors_services.model';

@ApiTags('Услуги пользователя')
@Controller('/api')
export class VisitorsServicesController {
    constructor(private visitorsServicesService: VisitorsServicesService) { }

    @ApiOperation({summary: 'Создать услугу пользователя'})
    @ApiResponse({status: 200, type: VisitorService})
    @Post('/create_visitor_service')
    createVisitorService(@Body() visittorServiceDto: CreateVisitorServiceDto){
        return this.visitorsServicesService.createVisitorService(visittorServiceDto)
    }

    @ApiOperation({summary: 'Получить все услуги пользователей за все время'})
    @ApiResponse({status: 200, type: [VisitorService]})
    @Get('/visitors_services')
    getAllVisitorsServices() {
        return this.visitorsServicesService.getAllVisitorsServices()
    }
}
