import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deponent } from './deponents.model';
import { CreateDeponentDto } from './dto/create-deponent.dto';

@Injectable()
export class DeponentsService {
    constructor(@InjectModel(Deponent) private deponentRepostiry: typeof Deponent) { }

    async createDeponent(dto: CreateDeponentDto) {
        const deponent = await this.deponentRepostiry.create(dto)
        return deponent
    }

    async getAllDeponents() {
        const deponents = await this.deponentRepostiry.findAll()
        return deponents
    }

    async getDeponentsByVisitorsId(visitorsId: []) {
        const deponents = await this.deponentRepostiry.findAll({ where: { visitor_id: visitorsId } })
        return deponents
    }
}
