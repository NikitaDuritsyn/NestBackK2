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
    async getDepositsByVisitorId(visitorId: number) {
        const deposits = await this.depositRepostiry.findAll({ where: { visitor_id: visitorId } })
        return deposits
    }



    async createVisitorsDeposits(dto: createVisitorsDepositsDto) {
        console.log(dto);
        if (dto.visitors.length === 1) {
            // В данном случае просто создём депозиты по данному пользователю и все.
            const deposits = []
            for (let i = 0; i < dto.deposits.length; i++) {
                const deposit = dto.deposits[i];
                deposits.push({
                    visitor_id: dto.visitors[0].id, payment_type_id: deposit.payment_type_id,
                    client_id: dto.visitors[0].client_id, value: deposit.value
                })
            }
            const visitorDeposits = await this.createVisitorDeposits(deposits)
            return visitorDeposits
        } else if (dto.visitors.length > 1) {
            console.log('-------------------------------------------------------------');
            // Алгоритм для случая если кто-то решил расплатиться за всех 
            const tariffs = await this.tariffsService.getAllTariffs()
            const visitors = await this.visitorsService.getVisitorsById(dto.visitors.map(item => item.id))

            for (let i = 0; i < visitors.length; i++) {
                const visitor = visitors[i];
                const visitorTariff = tariffs.filter((item) => { return (item.id === visitor.tariff_id) ? true : false; })[0]
                if (visitor.start_time_visitor && visitor.end_time_visitor) {

                    // Разница в минутах начала и конца веремени для посетителя
                    const deifferenceVisitorTime = Math.ceil((new Date(visitor.end_time_visitor).getTime() - new Date(visitor.start_time_visitor).getTime()) / 60000)

                    // Сумма которую нужно заплатить за тариф
                    const visitorTariffPayment = SetVisitorTariffPayment(visitorTariff, deifferenceVisitorTime)

                    // Сумма которую нужно заплатить за все услги
                    const visitorServicesPayment = (await this.visitorsService
                        .getVisitorsServices([visitor.id]))[0]?.visitorServices
                        .reduce((acc, item) => acc + item.service['price'], 0)

                    // Общая сумма внесенная посетителем (депозиты)
                    const visitorDepositsSumm = (await this
                        .getDepositsByVisitorId(visitor.id))
                        .reduce((acc, item) => acc + item.value, 0)

                    console.log('---------------------------------------------------------------');
                    console.log('VisitorId:', visitor.id)
                    console.log('---------------------------------------------------------------');
                    console.log(visitorDepositsSumm, '?=', (visitorServicesPayment) ? visitorServicesPayment + visitorTariffPayment : visitorTariffPayment, 'summ', visitorTariffPayment, 'за тариф', '+', (visitorServicesPayment) ? visitorServicesPayment : 0, 'за услуги');
                    console.log('---------------------------------------------------------------');



                } else if (visitor.start_time_visitor && !visitor.end_time_visitor) {
                    // const deifferenceVisitorTime = Math.ceil((new Date().getTime() - new Date(visitor.start_time_visitor).getTime()) / 60000)
                    // const visitorTariffPayment = SetVisitorTariffPayment(visitorTariff, deifferenceVisitorTime)
                    // const visitorDepositsSumm = (await this.getDepositsByVisitorId(visitor.id)).reduce((acc, item) => acc + item.value, 0)

                }
            }
            console.log('-------------------------------------------------------------');
            return 0
        }

        function SetVisitorTariffPayment(visitorTariff: Tariff, deifferenceVisitorTime: number) {
            let visitorTariffPayment = 0
            if (visitorTariff.metric == 'TimeBased') {
                visitorTariffPayment = deifferenceVisitorTime * visitorTariff.cost;
            } else if (visitorTariff.metric == 'Fixed') {// Тут вопросец еще пока
                visitorTariffPayment = visitorTariff.cost
            }
            return visitorTariffPayment
        }

    }

}
