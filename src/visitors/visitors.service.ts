import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { Visitor } from './visitor.model';
import { DepositsService } from 'src/deposits/deposits.service';
import { DeponentsService } from 'src/deponents/deponents.service';

@Injectable()
export class VisitorsService {
    constructor(@InjectModel(Visitor) private visitorRepository: typeof Visitor, private depositsService: DepositsService, private deponentsService: DeponentsService) { }

    async createVisitor(dto: CreateVisitorDto) {
        if (!dto.status) { dto.status = 'booked' }
        const visitor = await this.visitorRepository.create(dto);

        // if(dto.number_phone){
            // Если есть то добвылять клиента

        // }

        if (dto.deponent) {
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! client.id !!!!!!!!!!!!!!!!!!
            // И тут тоже depnent_value а не value
            const deponentData = { ...dto.deponent, visitor_id: visitor.id }
            this.deponentsService.createDeponent(deponentData)
        }
        if (dto.deposit) {
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! client.id !!!!!!!!!!!!!!!!!!
            const depositData = { ...dto.deposit, visitor_id: visitor.id,  } // На фронте обязательно заполнять тип тарифа и Поменять на фронте "value" на "deposit_value"
            this.depositsService.createDeposit(depositData)
        }


        return visitor
    }
    async getAllVisitors() {
        const visitors = await this.visitorRepository.findAll();
        return visitors
    }
}
