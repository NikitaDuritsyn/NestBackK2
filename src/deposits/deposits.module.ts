import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/clients/client.model';
import { PaymentType } from 'src/payment_types/payment_types.model';
import { Visitor } from 'src/visitors/visitor.model';
import { DepositsController } from './deposits.controller';
import { Deposit } from './deposits.model';
import { DepositsService } from './deposits.service';
import { VisitorsModule } from 'src/visitors/visitors.module';
import { TariffsModule } from 'src/tariffs/tariffs.module';

@Module({
  controllers: [DepositsController],
  providers: [DepositsService],
  imports: [
    SequelizeModule.forFeature([Deposit, Client, Visitor, PaymentType]),
    forwardRef(() => VisitorsModule),
    TariffsModule,
  ],
  exports: [
    DepositsService
  ]
})
export class DepositsModule { }
