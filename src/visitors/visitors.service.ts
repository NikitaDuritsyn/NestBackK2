import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { Visitor } from './visitor.model';
import { DepositsService } from 'src/deposits/deposits.service';
import { DeponentsService } from 'src/deponents/deponents.service';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class VisitorsService {
    constructor(@InjectModel(Visitor) private visitorRepository: typeof Visitor, private depositsService: DepositsService, private deponentsService: DeponentsService, private clientsService: ClientsService) { }

    async createVisitor(dto: CreateVisitorDto) {
        if (!dto.status) { dto.status = 'booked' }
        const visitor = await this.visitorRepository.create(dto);

        if (dto.number_phone) {
            // Если есть то ищем клиента клиента
            const client = await this.clientsService.getClientByPhone(dto.number_phone)
            if (client) {
                visitor.update({ client_id: client.id })

                if (dto.deponent) {
                    const deponentData = { ...dto.deponent, visitor_id: visitor.id, client_id: client.id }
                    await this.deponentsService.createDeponent(deponentData)
                }
                if (dto.deposit) {
                    const depositData = { ...dto.deposit, visitor_id: visitor.id, client_id: client.id } // На фронте обязательно заполнять тип тарифа и Поменять на фронте "value" на "value"
                    await this.depositsService.createDeposit(depositData)
                }
            } else {
                const newClientCreated = await this.clientsService.createClient(dto)
                visitor.update({ client_id: newClientCreated.id })

                if (dto.deponent.value) {
                    const deponentData = { ...dto.deponent, visitor_id: visitor.id, client_id: newClientCreated.id }
                    await this.deponentsService.createDeponent(deponentData)
                }
                if (dto.deposit.value) {
                    const depositData = { ...dto.deposit, visitor_id: visitor.id, client_id: newClientCreated.id } // На фронте обязательно заполнять тип тарифа и Поменять на фронте "value" на "deposit_value"
                    await this.depositsService.createDeposit(depositData)
                }
            }
        }
        return visitor
    }
    async getAllVisitors() {
        const visitors = await this.visitorRepository.findAll();
        return visitors
    }
    async getVisitorsBySession(sessionId: number) {
        const visitorsBySession = await this.visitorRepository.findAll({ where: { session_id: sessionId } });
        return visitorsBySession
    }
}
