import { Module } from '@nestjs/common';
import { TariffsService } from './tariffs.service';
import { TariffsController } from './tariffs.controller';
import { Tariff } from './tariffs.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from 'src/sessions/sessions.model';
import { Visitor } from 'src/visitors/visitor.model';

@Module({
  providers: [TariffsService],
  controllers: [TariffsController],
  imports: [
    SequelizeModule.forFeature([Tariff, Session, Visitor])
  ]
})
export class TariffsModule { }
