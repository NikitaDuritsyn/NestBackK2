import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Deposit } from 'src/deposits/deposits.model';
import { PaymentTypesController } from './payment_types.controller';
import { PaymentType } from './payment_types.model';
import { PaymentTypesService } from './payment_types.service';

@Module({
  controllers: [PaymentTypesController],
  providers: [PaymentTypesService],
  imports: [
    SequelizeModule.forFeature([PaymentType, Deposit])
  ],
  exports:[
    PaymentTypesService
  ]
})
export class PaymentTypesModule { }
