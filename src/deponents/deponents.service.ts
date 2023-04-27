import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deponent } from './deponents.model';
import { CreateDeponentDto } from './dto/create-deponent.dto';
import { UpdateDeponentDto } from './dto/update-deponent.dto';
import { DepositsService } from 'src/deposits/deposits.service';
import { PaymentTypesService } from 'src/payment_types/payment_types.service';
import { createVisitorsDepositsDto } from 'src/deposits/dto/create-visitors-deposits.dto';
import { Deposit } from 'src/deposits/deposits.model';
import { Visitor } from 'src/visitors/visitor.model';

@Injectable()
export class DeponentsService {
    constructor(@InjectModel(Deponent) private deponentRepostiry: typeof Deponent,
        private depositsService: DepositsService,
        private paymentTypesService: PaymentTypesService,
    ) { }

    async createDeponent(dto: CreateDeponentDto) {
        dto.status = 'active'
        const paymentTypes = await this.paymentTypesService.getAllPaymentTypes()
        dto.payment_type_id = paymentTypes.filter(item => item.dataValues.type === 'cash')[0].id
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


    async useDeponents(dto: UpdateDeponentDto[]) {
        try {
            const deponents = dto.filter((deponent) => deponent.status !== 'movedCash')
            if (deponents.length > 0) {
                // Сначала обновить депоненты и добавить им статус "movedCash"
                const usedDeponents = await this.deponentRepostiry.update(
                    { status: 'movedCash' },
                    { where: { id: deponents.map((deponent) => deponent.id) } }
                );
                // Создать депозит через depositsService в deponent лежат уже все данные чтобы создать депозит.
                for (let i = 0; i < deponents.length; i++) {
                    const visitorDeposit = new Deposit
                    visitorDeposit.payment_type_id = deponents[i].payment_type_id
                    visitorDeposit.value = deponents[i].value

                    const payer = new Visitor
                    payer.id = deponents[i].visitor_id
                    payer.client_id = deponents[i].client_id

                    const visitorDepositDepositData = new createVisitorsDepositsDto
                    visitorDepositDepositData.payer = payer
                    visitorDepositDepositData.deposits = [visitorDeposit];

                    await this.depositsService.createVisitorsDeposits(visitorDepositDepositData)
                }
                return usedDeponents
            } else {
                return { massage: 'Нет неиспользованных депонентов у пользователя' }
            }
        } catch (error) {
            // code that handles the exception
            return error.message
        }
    }
}
