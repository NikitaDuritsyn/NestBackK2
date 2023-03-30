import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentTypeDto } from './dto/payment_types-create.dto';
import { PaymentType } from './payment_types.model';

@Injectable()
export class PaymentTypesService {

    constructor(@InjectModel(PaymentType) private paymentTypeRepository: typeof PaymentType) { }

    async createPaymentType(dto: CreatePaymentTypeDto) {
        const paymentType = await this.paymentTypeRepository.create(dto)
        return paymentType
    }

    async getAllPaymentTypes() {
        const paymentTypes = await this.paymentTypeRepository.findAll()
        return paymentTypes
    }

    async deletePaymentType(paymentTypeId: number) {
        const paymentType = await this.paymentTypeRepository.destroy({ where: { id: paymentTypeId } })
        return paymentType
    }

}
