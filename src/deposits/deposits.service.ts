import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deposit } from './deposits.model';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Injectable()
export class DepositsService {
    constructor(@InjectModel(Deposit) private depositRepostiry: typeof Deposit) { }
    
    async createDeposit(dto: CreateDepositDto) {
        const deposit = await this.depositRepostiry.create(dto)
        return deposit
    }

    async getAlldeposits() {
        const deposits = await this.depositRepostiry.findAll()
        return deposits
    }

    async getDepositsByVisitorsId(visitorsId: []) {
        const deposits = await this.depositRepostiry.findAll({ where: { visitor_id: visitorsId } })
        return deposits
    }
}
