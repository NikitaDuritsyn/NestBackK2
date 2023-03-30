import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsServicesController } from './visitors_services.controller';

describe('VisitorsServicesController', () => {
  let controller: VisitorsServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorsServicesController],
    }).compile();

    controller = module.get<VisitorsServicesController>(VisitorsServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
