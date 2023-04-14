import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VisitorServices } from './visitors_services.model';
import { CreateVisitorServiceDto } from './dto/create-visitor_service.dto';

@Injectable()
export class VisitorsServicesService {
    constructor(
        @InjectModel(VisitorServices) private visitorServiceRepository: typeof VisitorServices,
    ) { }

    async createVisitorService(dto: CreateVisitorServiceDto) {
        const visitorService = await this.visitorServiceRepository.create(dto);
        return visitorService
    }

    async getVisitorsServices(visitorsId: [number]) {
        const visitorsServices = await this.visitorServiceRepository.findAll({ where: { visitor_id: visitorsId } })
        return visitorsServices
    }
}