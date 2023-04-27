import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deposit } from './deposits.model';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { createVisitorsDepositsDto } from './dto/create-visitors-deposits.dto';
import { VisitorsService } from 'src/visitors/visitors.service';
import { TariffsService } from 'src/tariffs/tariffs.service';
import { Tariff } from 'src/tariffs/tariffs.model';

@Injectable()
export class DepositsService {
    constructor(
        @InjectModel(Deposit) private depositRepostiry: typeof Deposit,
        @Inject(forwardRef(() => VisitorsService))
        private visitorsService: VisitorsService,
        private tariffsService: TariffsService,
    ) { }
    async createDeposit(dto: CreateDepositDto) {
        const deposit = await this.depositRepostiry.create(dto)
        return deposit
    }
    async createVisitorDeposits(dto: CreateDepositDto[]) {
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
    async getDepositsByVisitorId(visitorId: number) {
        const deposits = await this.depositRepostiry.findAll({ where: { visitor_id: visitorId } })
        return deposits
    }
    async createVisitorsDeposits(dto: createVisitorsDepositsDto) {

        function setVisitorTariffPayment(visitorTariff: Tariff, deifferenceVisitorTime: number) {
            let visitorTariffPayment = 0;
            if (visitorTariff.metric === 'TimeBased') {
                visitorTariffPayment = deifferenceVisitorTime * visitorTariff.cost;
            } else if (visitorTariff.metric === 'Fixed') {
                visitorTariffPayment = visitorTariff.cost;
            }
            return visitorTariffPayment;
        }

        const tariffs = await this.tariffsService.getAllTariffs();
        const payer = await this.visitorsService.getVisitorById(dto.payer.id);
        const deposits = dto.deposits.map(deposit => ({
            visitor_id: dto.payer.id,
            payment_type_id: deposit.payment_type_id,
            client_id: dto.payer.client_id,
            value: deposit.value
        }));
        
        let unusedDepositsSumm = deposits.reduce((acc, item) => acc + item.value, 0);
        const payerTariff = tariffs.find(item => item.id === payer.tariff_id);

        if (payer.start_time_visitor && payer.end_time_visitor) {
            const deifferencePayerTime = Math.ceil(
                (new Date(payer.end_time_visitor).getTime() - new Date(payer.start_time_visitor).getTime()) / 60000
            );
            const payerTariffPayment = setVisitorTariffPayment(payerTariff, deifferencePayerTime);
            const payerServices = await this.visitorsService.getVisitorsServices([payer.id]);
            const payerServicesPayment = payerServices[0]?.visitorServices.reduce((acc, item) => acc + item.service['price'], 0) || 0;
            const payerDepositsSumm = (await this.getDepositsByVisitorId(payer.id)).reduce((acc, item) => acc + item.value, 0);
            const payertDebt = payerServicesPayment + payerTariffPayment - payerDepositsSumm;

            unusedDepositsSumm -= payertDebt;
        } else if (payer.start_time_visitor && !payer.end_time_visitor) {
            return await this.createVisitorDeposits(deposits);
        }
        const payerDeposits = await this.createVisitorDeposits(deposits);
        if (unusedDepositsSumm < 0) {
            return { message: `Еще нужно заплатить за плательщика ${unusedDepositsSumm * (-1)}` };
        } else {
            await this.visitorsService.updateVisitor({ ...payer.dataValues, status: 'close' });
        }
        let countVisitorsClose = 0;
        if (dto.visitors.length > 0) {
            const visitors = await this.visitorsService.getVisitorsById(dto.visitors.map(item => item.id));
            for (const visitor of visitors) {
                const visitorTariff = tariffs.find(item => item.id === visitor.tariff_id);
                if (visitor.start_time_visitor && visitor.end_time_visitor) {
                    const deifferenceVisitorTime = Math.ceil(
                        (new Date(visitor.end_time_visitor).getTime() - new Date(visitor.start_time_visitor).getTime()) / 60000
                    );
                    const visitorTariffPayment = setVisitorTariffPayment(visitorTariff, deifferenceVisitorTime);
                    const visitorServices = await this.visitorsService.getVisitorsServices([visitor.id]);
                    const visitorServicesPayment = visitorServices[0]?.visitorServices.reduce((acc, item) => acc + item.service['price'], 0) || 0;
                    const visitorDepositsSumm = (await this.getDepositsByVisitorId(visitor.id)).reduce((acc, item) => acc + item.value, 0);
                    const visitorDebt = visitorServicesPayment + visitorTariffPayment - visitorDepositsSumm;
                    unusedDepositsSumm -= visitorDebt;
                    if (unusedDepositsSumm < 0) {
                        break;
                    } else {
                        await this.visitorsService.updateVisitor({ ...visitor.dataValues, status: 'close' });
                        countVisitorsClose++;
                    }
                }
            }
            if (unusedDepositsSumm < 0) {
                return { message: `Еще нужно заплатить за ${visitors.length - countVisitorsClose}: ${unusedDepositsSumm * (-1)}` };
            } else {
                return { message: `Все пользователи закрыты, сдача: ${unusedDepositsSumm}` };
            }
        } else {
            return payerDeposits;
        }

    }
}
