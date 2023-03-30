import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsServicesService } from './visitors_services.service';

describe('VisitorsServicesService', () => {
  let service: VisitorsServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitorsServicesService],
    }).compile();

    service = module.get<VisitorsServicesService>(VisitorsServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
