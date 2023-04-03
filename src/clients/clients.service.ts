import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
    constructor(@InjectModel(Client) private clientRepostiry: typeof Client) { }

    async createClient(dto: CreateClientDto) {
        const client = await this.clientRepostiry.create(dto)
        return client
    }

    async getAllClients() {
        const clients = await this.clientRepostiry.findAll()
        return clients
    }

    async getClientByPhone(phone: string) {
        const clientByPhone = await this.clientRepostiry.findOne({ where: { number_phone: phone } })
        return clientByPhone
    }
}
