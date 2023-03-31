import { Module } from '@nestjs/common';
import { VisitorsServicesController } from './visitors_services.controller';
import { VisitorsServicesService } from './visitors_services.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitorService } from './visitors_services.model';
import { Visitor } from 'src/visitors/visitor.model';
import { Service } from 'src/services/services.model';

@Module({
  controllers: [VisitorsServicesController],
  providers: [VisitorsServicesService],
  imports: [
    SequelizeModule.forFeature([VisitorService, Visitor, Service])
  ]
})
export class VisitorsServicesModule { }
