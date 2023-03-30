import { Module } from '@nestjs/common';
import { VisitorsServicesController } from './visitors_services.controller';
import { VisitorsServicesService } from './visitors_services.service';

@Module({
  controllers: [VisitorsServicesController],
  providers: [VisitorsServicesService]
})
export class VisitorsServicesModule {}
