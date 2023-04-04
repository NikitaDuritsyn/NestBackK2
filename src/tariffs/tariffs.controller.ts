import { Post, Body, Controller, Get, Param, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { Tariff } from './tariffs.model';
import { TariffsService } from './tariffs.service';

@ApiTags('Тарифы')
@Controller('/api')
export class TariffsController {

    constructor(private tariffsService: TariffsService) { }

    @ApiOperation({ summary: 'Создать тарифф' })
    @ApiResponse({ status: 200, type: Tariff })
    @Post('/create_tariff')
    createTariff(@Body() tariffDto: CreateTariffDto) {
        return this.tariffsService.createTariff(tariffDto)
    }

    @ApiOperation({ summary: 'Получить все Тариффы' })
    @ApiResponse({ status: 200, type: [Tariff] })
    @Get('/get_tariffs')
    getAllTariffs() {
        return this.tariffsService.getAllTariffs()
    }

    @ApiOperation({ summary: 'Удалить тариф' })
    @ApiResponse({ status: 200, type: [Tariff] })
    @Delete('/delete_tariff/:tariffId')
    deleteTariffById(@Param('tariffId') tariffId: number) {
        return this.tariffsService.deleteTriffById(tariffId)
    }
}
