import { Module, forwardRef } from '@nestjs/common';
import { VisitorsServicesController } from './visitors_services.controller';
import { VisitorsServicesService } from './visitors_services.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitorServices } from './visitors_services.model';
import { Visitor } from 'src/visitors/visitor.model';
import { Service } from 'src/services/services.model';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [VisitorsServicesController],
  providers: [VisitorsServicesService],
  imports: [
    SequelizeModule.forFeature([VisitorServices, Visitor, Service]),
    ServicesModule,
  ],
  exports: [
    VisitorsServicesService
  ]
})
export class VisitorsServicesModule { }
