import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreatePaymentTypeDto } from './dto/payment_types-create.dto';
import { PaymentType } from './payment_types.model';
import { PaymentTypesService } from './payment_types.service';

@ApiTags('Тип оплаты')
@Controller('/api')
export class PaymentTypesController {
    constructor(private paymentTypesService: PaymentTypesService) { }

    @ApiOperation({ summary: 'Создание типа оплаты' })
    @ApiResponse({ status: 200, type: PaymentType })
    @Post('/create_payment_type')
    createPaymentType(@Body() paymentTypeDto: CreatePaymentTypeDto) {
        return this.paymentTypesService.createPaymentType(paymentTypeDto)
    }

    @ApiOperation({ summary: 'Получить все типы оплаты' })
    @ApiResponse({ status: 200, type: [PaymentType] })
    @Get('/get_payment_types')
    getAllPaymentType() {
        return this.paymentTypesService.getAllPaymentTypes()
    }

    @ApiOperation({ summary: 'Удалить тип оплаты' })
    @ApiResponse({ status: 200, type: PaymentType })
    @Delete('/delete_payment_type')
    deletePaymentType(@Param('id') id: number) {
        return this.deletePaymentType(id)
    }
}
