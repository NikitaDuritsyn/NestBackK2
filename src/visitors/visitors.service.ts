import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { Visitor } from './visitor.model';
import { DepositsService } from 'src/deposits/deposits.service';
import { DeponentsService } from 'src/deponents/deponents.service';
import { ClientsService } from 'src/clients/clients.service';
import { UpdateVisitorsDto } from './dto/update-visitors.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { CreateSomeVisitorsDto } from './dto/create-somevisitors.dto';
import { Service } from 'src/services/services.model';
import { VisitorServices } from 'src/visitors_services/visitors_services.model';

@Injectable()
export class VisitorsService {
    constructor(@InjectModel(Visitor) private visitorRepository: typeof Visitor,
        @Inject(forwardRef(() => DepositsService))
        private depositsService: DepositsService,
        private deponentsService: DeponentsService,
        private clientsService: ClientsService,
    ) { }
    async getVisitorsById(visitorsId: number[]) {
        const visitors = await this.visitorRepository.findAll({ where: { id: visitorsId } });
        return visitors
    }
    async createVisitor(dto: CreateVisitorDto, sessionId?: number) {
        if (!dto.status) { dto.status = 'booked' }
        if (sessionId) { dto.session_id = sessionId }
        const visitor = await this.visitorRepository.create(dto);
        if (dto.number_phone) {
            const client = await this.clientsService.getClientByPhone(dto.number_phone)
            if (client) {
                visitor.update({ client_id: client.id })
                if (dto.deponent?.value) {
                    const deponentData = { ...dto.deponent, visitor_id: visitor.id, client_id: client.id }
                    await this.deponentsService.createDeponent(deponentData)
                }
                if (dto.deposit?.value) {
                    const depositData = { ...dto.deposit, visitor_id: visitor.id, client_id: client.id } // На фронте обязательно заполнять тип тарифа и Поменять на фронте "value" на "value"
                    await this.depositsService.createDeposit(depositData)
                }
            } else {
                const newClientCreated = await this.clientsService.createClient(dto)
                visitor.update({ client_id: newClientCreated.id })
                if (dto.deponent?.value) {
                    const deponentData = { ...dto.deponent, visitor_id: visitor.id, client_id: newClientCreated.id }
                    await this.deponentsService.createDeponent(deponentData)
                }
                if (dto.deposit?.value) {
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
        const visitorUpdated = this.visitorRepository.update(dto, { where: { id: dto.id } })
        return visitorUpdated
    }
    async updateVisitors(updateVisitors: UpdateVisitorsDto) {
        if (updateVisitors.visitorUpdateData.start_time_visitor) {
            updateVisitors.visitorUpdateData.status = 'active'
        }
        if (updateVisitors.visitorUpdateData.end_time_visitor) {
            updateVisitors.visitorUpdateData.status = 'close'
        }
        const visitorsUpdated = await this.visitorRepository.update(updateVisitors.visitorUpdateData, { where: { id: updateVisitors.visitorsId } })
        return visitorsUpdated
    }
    async getStartTimeSessionByVisitors(sessionId: number) {
        const startTimeSession = await this.visitorRepository.findOne({ attributes: ['start_time_visitor'], where: { session_id: sessionId }, order: [['start_time_visitor', 'ASC']] })
        return startTimeSession.dataValues.start_time_visitor
    }
    async getEndTimeSessionByVisitors(sessionId: number) {
        let valid = true

        const visitors = await this.visitorRepository.findAll({ where: { session_id: sessionId }, attributes: ['end_time_visitor'] })
        for (let i = 0; i < visitors.length; i++) {
            if (!visitors[i].end_time_visitor) {
                valid = false
            }
        }

        if (valid) {
            const endTimeSession = await this.visitorRepository.findOne({ attributes: ['end_time_visitor'], where: { session_id: sessionId }, order: [['end_time_visitor', 'DESC']] })
            return endTimeSession.dataValues.end_time_visitor
        } else {
            return null
        }
    }
    async deleteVisitorById(visitorId: number) {
        const vsitiorDeleted = await this.visitorRepository.destroy({ where: { id: visitorId } })
        return vsitiorDeleted
    }
    async createSomeVisitors(data: CreateSomeVisitorsDto) {
        console.log('-------------------------------------');
        const visitor = {
            name: 'Anonymous',
            session_id: data.session_id,
            tariff_id: data.tariff_id,
            status: 'booked'
        }
        const visitorArray = []
        for (let i = 0; i < data.visitorsNum; i++) {
            visitorArray.push(visitor)
        }
        console.log(visitorArray);
        const visitorsCreated = await this.visitorRepository.bulkCreate(visitorArray);

        console.log('-------------------------------------');
        return visitorsCreated
    }


    async getVisitorsServices(visitorsId: number[]) {
        const visitorsServices = await this.visitorRepository.findAll({
            where: { id: visitorsId },
            include: [
                {
                    model: VisitorServices,
                    attributes: ['id'],
                    required: true,
                    include: [
                        {
                            model: Service,
                            required: true,
                            attributes: ['price', 'title'],
                        }
                    ]
                }],
            attributes: ['name']
        });
        return visitorsServices
    }
}
