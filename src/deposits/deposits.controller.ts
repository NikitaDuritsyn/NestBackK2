import { Controller } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Deposit } from './deposits.model';
import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { CreateVisitorDepositsDto } from './dto/create-visitor_deposits.dto';
import { createVisitorsDepositsDto } from './dto/create-visitors-deposits.dto';

@ApiTags('Депозиты')
@Controller('/api')
export class DepositsController {
    constructor(private depositsService: DepositsService) { }

    @ApiOperation({ summary: 'Создание депозита' })
    @ApiResponse({ status: 200, type: Deposit })
    @Post('/create_deposit')
    createDeposit(@Body() depositDto: CreateDepositDto) {
        return this.depositsService.createDeposit(depositDto)
    }

    @ApiOperation({ summary: 'Получить все депозиты' })
    @ApiResponse({ status: 200, type: Deposit })
    @Get('/deposits')
    getAllDeposits() {
        return this.depositsService.getAlldeposits()
    }

    @ApiOperation({ summary: 'Получить все депозиты' })
    @ApiResponse({ status: 200, type: Deposit })
    @Post('/visitors_deposits')
    getDepositsByVisitorsId(@Body() visitorsId: []) {
        return this.depositsService.getDepositsByVisitorsId(visitorsId)
    }

    @ApiOperation({ summary: 'Создание депозитов пользователя (массив депозитов)' })
    @ApiResponse({ status: 200, type: [Deposit] })
    @Post('/create_visitor_deposits')
    createVisitorDeposits(@Body() visitorDepostisDto: CreateDepositDto[]) {
        return this.depositsService.createVisitorDeposits(visitorDepostisDto)
    }

    @ApiOperation({ summary: 'Создание депозитов посетителей' })
    @ApiResponse({ status: 200, type: createVisitorsDepositsDto })
    @Post('/create_visitors_deposits')
    createVisitorsDepositsAndCloseVisitors(@Body() createVisitorsDepositsDto: createVisitorsDepositsDto) {
        return this.depositsService.createVisitorsDeposits(createVisitorsDepositsDto)
    }
}
