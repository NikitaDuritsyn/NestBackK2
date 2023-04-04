import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { Tariff } from './tariffs.model';

@Injectable()
export class TariffsService {

    constructor(@InjectModel(Tariff) private tariffRepository: typeof Tariff) { }

    async createTariff(dto: CreateTariffDto) {
        const tariff = await this.tariffRepository.create(dto);
        return tariff
    }

    async getAllTariffs() {
        const tariffs = await this.tariffRepository.findAll();
        return tariffs
    }

    async deleteTriffById(tariffId: number) {
        const tariff = await this.tariffRepository.destroy({ where: { id: tariffId } })
        return tariff

    }
}
