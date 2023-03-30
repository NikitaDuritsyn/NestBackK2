import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/clients/client.model';
import { PaymentType } from 'src/payment_types/payment_types.model';
import { Visitor } from 'src/visitors/visitor.model';
import { DepositsController } from './deposits.controller';
import { Deposit } from './deposits.model';
import { DepositsService } from './deposits.service';

@Module({
  controllers: [DepositsController],
  providers: [DepositsService],
  imports: [
    SequelizeModule.forFeature([Deposit, Client, Visitor, PaymentType])
  ]
})
export class DepositsModule { }
