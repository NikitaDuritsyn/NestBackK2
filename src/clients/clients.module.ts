import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Deponent } from 'src/deponents/deponents.model';
import { Deposit } from 'src/deposits/deposits.model';
import { Visitor } from 'src/visitors/visitor.model';
import { Client } from './client.model';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    SequelizeModule.forFeature([Client, Visitor, Deponent, Deposit])
  ]
})
export class ClientsModule { }
