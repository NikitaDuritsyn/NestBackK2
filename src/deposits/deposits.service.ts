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
        console.log(dto.deposits);
        

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


    // const tariffs = await this.tariffsService.getAllTariffs()
    // const payer = await this.visitorsService.getVisitorById(dto.payer.id)
    // const deposits = dto.deposits.map(deposit => ({
    //     visitor_id: dto.payer.id,
    //     payment_type_id: deposit.payment_type_id,
    //     client_id: dto.payer.client_id,
    //     value: deposit.value
    // }));
    // // Общая сумма текущих внесенных депозитов
    // let unusedDepositsSumm = deposits.reduce((acc, item) => acc + item.value, 0)
    // // Узнаем какой тариф у плательщика
    // const payerTariff = tariffs.filter((item) => { return (item.id === payer.tariff_id) ? true : false; })[0]
    // if (payer.start_time_visitor && payer.end_time_visitor) {
    //     // Разница в минутах начала и конца веремени в сессии для плательщика 
    //     const deifferencePayerTime = Math.ceil((new Date(payer.end_time_visitor).getTime() - new Date(payer.start_time_visitor).getTime()) / 60000)
    //     // Сумма которую нужно заплатить за тариф плательщику
    //     const payerTariffPayment = SetVisitorTariffPayment(payerTariff, deifferencePayerTime)
    //     // Сумма которую нужно заплатить за все услги плательщику
    //     const payerServicesPayment = (await this.visitorsService
    //         .getVisitorsServices([payer.id]))[0]?.visitorServices
    //         .reduce((acc, item) => acc + item.service['price'], 0)
    //     // Общая сумма депозитов внесенная плательщиком за время сессии (депозиты плательщика)
    //     const payerDepositsSumm = (await this
    //         .getDepositsByVisitorId(payer.id))
    //         .reduce((acc, item) => acc + item.value, 0)
    //     // Расчет долга, все услуги + цена за тариф - сумма депозитов плательщика
    //     const payertDebt = (payerServicesPayment) ? payerServicesPayment + payerTariffPayment - payerDepositsSumm : payerTariffPayment - payerDepositsSumm
    //     // Здесь мы считаем остаток от последней внесенной суммы плательщиком
    //     unusedDepositsSumm = unusedDepositsSumm - payertDebt
    // } else if (payer.start_time_visitor && !payer.end_time_visitor) {
    //     // Если время посетителя не подошло к концу, простно вносим его депозит и все
    //     const payerDeposits = await this.createVisitorDeposits(deposits)
    //     return payerDeposits
    // }
    // // Вносим депозиты плательщика
    // const payerDeposits = await this.createVisitorDeposits(deposits)
    // if (unusedDepositsSumm < 0) {
    //     // Если остаток от последней внесенной суммы отрицателен, то получается что плательщик еще должен денег
    //     return { massage: `Еще нужно заплатить за плательщика ${unusedDepositsSumm * (-1)}` }
    // } else {
    //     // В ином случае мы закрываем плательщика изменив его статус на close, его долг получается оплачен
    //     await this.visitorsService.updateVisitor({ ...payer.dataValues, status: 'close' })
    // }
    // // Счетчик закрытых посетителей
    // let countVisitorsClose = 0
    // if (dto.visitors.length > 0) {
    //     // Если есить посетители, за которых платит данный плательщик, то берем все пользователей из бд
    //     const visitors = await this.visitorsService.getVisitorsById(dto.visitors.map(item => item.id))
    //     // В данном цыкле пробегаемся по всем пользователем, чтобы закрыть их долг за сессию
    //     for (let i = 0; i < visitors.length; i++) {
    //         const visitor = visitors[i];
    //         // Ищем какой тариф уу пользователя
    //         const visitorTariff = tariffs.filter((item) => { return (item.id === visitor.tariff_id) ? true : false; })[0]
    //         if (visitor.start_time_visitor && visitor.end_time_visitor) {
    //             // Если время польвазотеля окончено в данной сессии
    //             // Разница в минутах начала и конца веремени в сессии для посетителя
    //             const deifferenceVisitorTime = Math.ceil((new Date(visitor.end_time_visitor).getTime() - new Date(visitor.start_time_visitor).getTime()) / 60000)
    //             // Сумма которую нужно заплатить за тариф посетителя
    //             const visitorTariffPayment = SetVisitorTariffPayment(visitorTariff, deifferenceVisitorTime)
    //             // Сумма которую нужно заплатить за все услги посетителя
    //             const visitorServicesPayment = (await this.visitorsService
    //                 .getVisitorsServices([visitor.id]))[0]?.visitorServices
    //                 .reduce((acc, item) => acc + item.service['price'], 0)
    //             // Общая сумма внесенная посетителем за время сессии (депозиты посетителя)
    //             const visitorDepositsSumm = (await this
    //                 .getDepositsByVisitorId(visitor.id))
    //                 .reduce((acc, item) => acc + item.value, 0)
    //             // Расчет долга, все услуги + цена за тариф - сумма депозитов посетителя
    //             const visitorDebt = (visitorServicesPayment) ? visitorServicesPayment + visitorTariffPayment : visitorTariffPayment - visitorDepositsSumm
    //             // Здесь мы считаем остаток от последней внесенной суммы плательщиком
    //             unusedDepositsSumm = unusedDepositsSumm - visitorDebt
    //             if (unusedDepositsSumm < 0) {
    //                 // Если остаток от последней внесенной суммы отрицателен, то получается что за посетителя еще нужно вснести денег
    //                 break
    //             } else {
    //                 // В ином случае мы закрываем посетителя изменив его статус на close, его долг получается оплачен
    //                 this.visitorsService.updateVisitor({ ...visitor.dataValues, status: 'close' })
    //                 // Прибавляем к счетчику закрытых посетителей 1
    //                 countVisitorsClose = countVisitorsClose + 1
    //             }
    //         }
    //     }
    //     if (unusedDepositsSumm < 0) {
    //         // Если остаток от последней внесенной суммы отрицателен, то получается что за посетителей еще нужно вснести денег
    //         return { massage: `Еще нужно заплатить за ${visitors.length - countVisitorsClose}: ${unusedDepositsSumm * (-1)}` }
    //     } else {
    //         // В ином случае все пользователи закрыты и мы показываем сдачу, если от unusedDepositsSumm что-то осталось
    //         return { massage: `Все пользователи закрыты, сдача: ${unusedDepositsSumm}` }
    //     }
    // } else {
    //     // Если пользователей за которых платит плательщик нет и его время закрыто, то мы просто возвращаем ответ от бд что депозит записан
    //     return payerDeposits
    // }
    // // В данной функции мы расчитываем сумму которую нужно заплатить за тариф
    // function SetVisitorTariffPayment(visitorTariff: Tariff, deifferenceVisitorTime: number) {
    //     let visitorTariffPayment = 0
    //     if (visitorTariff.metric == 'TimeBased') {
    //         // Если тариф основан на расчете по времени то мы умнажаем количестов проведенного пользователем времени в минутах на цену
    //         visitorTariffPayment = deifferenceVisitorTime * visitorTariff.cost;
    //     } else if (visitorTariff.metric == 'Fixed') {
    //         // Если тариф фиксирован, то мы возвращаем просто цену за тариф
    //         visitorTariffPayment = visitorTariff.cost
    //     }
    //     return visitorTariffPayment
    // }

}
