import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './services.model';

@Injectable()
export class ServicesService {

    constructor(@InjectModel(Service) private serviceRepository: typeof Service) { }

    async createService(dto: CreateServiceDto) {
        const service = await this.serviceRepository.create(dto)
        return service
    }

    async getServiceById(serviceId: number) {
        const service = await this.serviceRepository.findByPk(serviceId)
        return service
    }

    async getServiceByServicesId(servicesId: number[]) {
        const service = await this.serviceRepository.findAll({ where: { id: servicesId } })
        return service
    }


    async getAllServices() {
        const services = await this.serviceRepository.findAll()
        return services
    }

    async deleteServiceById(serviceId: number) {
        const service = await this.serviceRepository.destroy({ where: { id: serviceId } })
        return service
    }
}