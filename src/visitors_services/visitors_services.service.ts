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

    async getVisitorsServicesByVisitorsId(visitorsId: [number]) {
        const [visitorsServices] = await this.visitorServiceRepository.sequelize
            .query(`SELECT visitors_services.id, services.title, services.price, visitors.name 
                    FROM visitors_services 
                    JOIN services ON visitors_services.service_id=services.id 
                    JOIN visitors ON visitors_services.visitor_id=visitors.id 
                    WHERE visitors_services.visitor_id IN (${visitorsId})`)
        return visitorsServices

    }
}