import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/clients/client.model';
import { Visitor } from 'src/visitors/visitor.model';
import { DeponentsController } from './deponents.controller';
import { Deponent } from './deponents.model';
import { DeponentsService } from './deponents.service';

@Module({
  controllers: [DeponentsController],
  providers: [DeponentsService],
  imports: [
    SequelizeModule.forFeature([Deponent, Client, Visitor])
  ]
})
export class DeponentsModule { }
