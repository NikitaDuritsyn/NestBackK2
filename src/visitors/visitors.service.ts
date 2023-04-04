import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { Visitor } from './visitor.model';
import { DepositsService } from 'src/deposits/deposits.service';
import { DeponentsService } from 'src/deponents/deponents.service';
import { ClientsService } from 'src/clients/clients.service';
import { UpdateVisitorDto } from './dto/update-visitor.dto';

@Injectable()
export class VisitorsService {
    constructor(@InjectModel(Visitor) private visitorRepository: typeof Visitor,
        private depositsService: DepositsService,
        private deponentsService: DeponentsService,
        private clientsService: ClientsService) { }

    async createVisitor(dto: CreateVisitorDto) {
        if (!dto.status) { dto.status = 'booked' }
        const visitor = await this.visitorRepository.create(dto);
        if (dto.number_phone) {
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
        const [visitorsBySession, metadata] = await this.visitorRepository.sequelize
            .query(`SELECT 
                visitors.id, visitors.session_id, visitors.tariff_id, visitors.client_id, visitors.start_time_visitor, visitors.end_time_visitor, visitors.name, visitors.status, 
                clients.number_phone
                FROM visitors LEFT JOIN clients ON visitors.client_id = clients.id 
                WHERE visitors.session_id = ${sessionId};`);

        visitorsBySession.sort((a, b) => a['name'] > b['name'] ? 1 : -1);
        return visitorsBySession
    }
    async getVisitorById(visitorId: number) {
        const visitor = this.visitorRepository.findOne({ where: { id: visitorId } })
        return visitor
    }
    async updateVisitor(dto: UpdateVisitorDto) {
        if (dto.start_time_visitor) {
            const visitorUpdated = await this.visitorRepository
                .update({
                    start_time_visitor: dto.start_time_visitor
                }, {
                    where: { id: dto.id }
                })
            const sessionStartTime = await this.visitorRepository
                .findAll({
                    attributes: ['start_time_visitor'],
                    where: { session_id: dto.session_id },
                    order: ['start_time_visitor', 'ASC'],
                    limit: 1
                })

            // await pool.query(`UPDATE visitors SET start_time_visitor = '${startTime}', status = 'active' WHERE id IN (${visitorsId})`) // ready
            // const sessionStartTime = await pool.query(`SELECT start_time_visitor FROM visitors WHERE session_id = ${sessionId} ORDER BY start_time_visitor ASC LIMIT 1`) // ready
            // const session = await pool.query(`UPDATE sessions SET start_time_session = '${new Date(sessionStartTime.rows[0].start_time_visitor).toISOString()}', status = 'active' WHERE id = $1 RETURNING *`, [sessionId]) // ready
            // res.json(session.rows)

        }
        if (dto.end_time_visitor) {

        }
    }
}
