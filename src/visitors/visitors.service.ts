import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { Visitor } from './visitor.model';

@Injectable()
export class VisitorsService {
    constructor(@InjectModel(Visitor) private visitorRepository: typeof Visitor) { }

    async createVisitor(dto: CreateVisitorDto) {
        const visitor = await this.visitorRepository.create(dto);
        return visitor
    }
    async getAllVisitors() {
        const visitors = await this.visitorRepository.findAll();
        return visitors
    }
}
