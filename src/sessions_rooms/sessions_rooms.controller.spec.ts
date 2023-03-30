import { Test, TestingModule } from '@nestjs/testing';
import { SessionsRoomsController } from './sessions_rooms.controller';

describe('SessionsRoomsController', () => {
  let controller: SessionsRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsRoomsController],
    }).compile();

    controller = module.get<SessionsRoomsController>(SessionsRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
