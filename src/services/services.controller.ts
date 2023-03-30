import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './services.model';
import { ServicesService } from './services.service';

@ApiTags('Услуги')
@Controller('/api')
export class ServicesController {

    constructor(private servicesService: ServicesService) { }

    @ApiOperation({ summary: 'Создвние услуги' })
    @ApiResponse({ status: 200, type: Service })
    @Post('/create_service')
    createService(@Body() serviceDto: CreateServiceDto) {
        return this.servicesService.createService(serviceDto)
    }

    @ApiOperation({ summary: 'Получение всех услуг' })
    @ApiResponse({ status: 200, type: [Service] })
    @Get('/get_services')
    getAllServices() {
        return this.servicesService.getAllServices()
    }

    @ApiOperation({ summary: 'Получение услуги по её id' })
    @ApiResponse({ status: 200, type: Service })
    @Get('/get_service/:id')
    getServiceById(@Param('id') id: number) {
        return this.servicesService.getServiceById(id)
    }

    @ApiOperation({ summary: 'Удаление услуги по её id' })
    @ApiResponse({ status: 200, type: Service })
    @Delete('/delete_service/:id')
    deleteSeriveById(@Param('id') id: number) {
        return this.servicesService.deleteServiceById(id)
    }
}
