import { Module } from '@nestjs/common';
import { SessionsRoomsController } from './sessions_rooms.controller';
import { SessionsRoomsService } from './sessions_rooms.service';

@Module({
  controllers: [SessionsRoomsController],
  providers: [SessionsRoomsService]
})
export class SessionsRoomsModule {}
