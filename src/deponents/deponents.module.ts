import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/clients/client.model';
import { Visitor } from 'src/visitors/visitor.model';
import { DeponentsController } from './deponents.controller';
import { Deponent } from './deponents.model';
import { DeponentsService } from './deponents.service';
import { DepositsModule } from 'src/deposits/deposits.module';
import { PaymentTypesModule } from 'src/payment_types/payment_types.module';

@Module({
  controllers: [DeponentsController],
  providers: [DeponentsService],
  imports: [
    SequelizeModule.forFeature([Deponent, Client, Visitor]),
    DepositsModule,
    PaymentTypesModule
  ],
  exports: [
    DeponentsService
  ]
})
export class DeponentsModule { }
