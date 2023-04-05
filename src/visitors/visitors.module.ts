import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/clients/client.model';
import { Deponent } from 'src/deponents/deponents.model';
import { Deposit } from 'src/deposits/deposits.model';
import { Tariff } from 'src/tariffs/tariffs.model';
import { Visitor } from './visitor.model';
import { VisitorsController } from './visitors.controller';
import { VisitorsService } from './visitors.service';
import { Service } from 'src/services/services.model';
import { DeponentsModule } from 'src/deponents/deponents.module';
import { DepositsModule } from 'src/deposits/deposits.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  controllers: [VisitorsController],
  providers: [VisitorsService],
  imports: [
    SequelizeModule.forFeature([Visitor, Tariff, Client, Deposit, Deponent, Service]),
    DeponentsModule,
    DepositsModule,
    ClientsModule,
  ],
  exports: [
    VisitorsService
  ]
})
export class VisitorsModule { }
