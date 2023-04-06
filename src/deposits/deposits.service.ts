import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deposit } from './deposits.model';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { CreateVisitorDepositsDto } from './dto/create-visitor_deposits.dto';

@Injectable()
export class DepositsService {
    constructor(@InjectModel(Deposit) private depositRepostiry: typeof Deposit) { }

    async createDeposit(dto: CreateDepositDto) {
        const deposit = await this.depositRepostiry.create(dto)
        return deposit
    }

    async createVisitorDeposits(dto: CreateDepositDto[]) {
        for (let i = 0; i < dto.length; i++) {
            console.log(dto[i]);
        }
        const deposits = await this.depositRepostiry.bulkCreate(dto)
        return deposits
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
