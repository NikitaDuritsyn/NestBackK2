import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VisitorService } from './visitors_services.model';
import { CreateVisitorServiceDto } from './dto/create-visitor_service.dto';

@Injectable()
export class VisitorsServicesService {
    constructor(@InjectModel(VisitorService) private visitorServiceRepository: typeof VisitorService) { }

    async createVisitorService(dto: CreateVisitorServiceDto) {
        const visitorService = await this.visitorServiceRepository.create(dto);
        return visitorService
    }

    async getAllVisitorsServices() {
        const visitorsServices = await this.visitorServiceRepository.findAll();
        return visitorsServices
    }
}
