import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/clients/client.model';
import { Deponent } from 'src/deponents/deponents.model';
import { Deposit } from 'src/deposits/deposits.model';
import { Session } from 'src/sessions/sessions.model';
import { Tariff } from 'src/tariffs/tariffs.model';
import { Visitor } from './visitor.model';
import { VisitorsController } from './visitors.controller';
import { VisitorsService } from './visitors.service';
import { Service } from 'src/services/services.model';

@Module({
  controllers: [VisitorsController],
  providers: [VisitorsService],
  imports: [
    SequelizeModule.forFeature([Visitor, Tariff, Session, Client, Deposit, Deponent, Service])
  ]
})
export class VisitorsModule { }
