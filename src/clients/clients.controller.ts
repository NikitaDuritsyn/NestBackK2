import { Controller } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Client } from './client.model';

@ApiTags('Клиенты')
@Controller('/api')
export class ClientsController {
    constructor(private clientsService: ClientsService) { }

    @ApiOperation({ summary: 'Создание клиента' })
    @ApiResponse({ status: 200, type: Client })
    @Post('/create_client')
    createSession(@Body() clientDto: CreateClientDto) {
        return this.clientsService.createClient(clientDto)
    }


    @ApiOperation({ summary: 'Получение всех клиентов' })
    @ApiResponse({ status: 200, type: [Client] })
    @Get('/get_clients')
    getAllClients() {
        return this.clientsService.getAllClients()
    }

    @ApiOperation({ summary: 'Получение всех клиентов' })
    @ApiResponse({ status: 200, type: [Client] })
    @Post('/get_client_by_phone')
    getClientByPhone(@Body() body: any) {
        return this.clientsService.getClientByPhone(body.number_phone)
    }
}
