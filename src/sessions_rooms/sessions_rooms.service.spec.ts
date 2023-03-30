import { Test, TestingModule } from '@nestjs/testing';
import { SessionsRoomsService } from './sessions_rooms.service';

describe('SessionsRoomsService', () => {
  let service: SessionsRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionsRoomsService],
    }).compile();

    service = module.get<SessionsRoomsService>(SessionsRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
